// Run with node tools/check_integration.js from the HyperTheoValues folder.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const saved = new Map([['quizAnswers', '{"economics":[{"value":"state_socialism","agree":1}]}']]);
const context = vm.createContext({ localStorage: {
    getItem: key => saved.get(key) || null,
    setItem: (key, value) => saved.set(key, value)
} });
vm.runInContext(read('data.js') + '\n' + read('scoring.js') + '\n' +
    'globalThis.app = { categories, resultsMapping, denominationMapping, denominationFamilies, descriptions, denominationCategoryNotes, HV };', context);
const { categories, resultsMapping, denominationMapping, denominationFamilies, descriptions, HV } = context.app;
const tree = JSON.parse(read('questions_tree.json'));
let leaves = 0;
for (const category of categories) {
    const nodes = new Map(tree[category].map(node => [node.id, node]));
    assert.equal(nodes.size, tree[category].length, `Duplicate nodes in ${category}`);
    const visited = new Set();
    function visit(id, ancestors = new Set()) {
        assert(!ancestors.has(id), `Cycle at ${category}/${id}`);
        assert(nodes.has(id), `Missing target ${category}/${id}`);
        if (visited.has(id)) return;
        visited.add(id);
        const node = nodes.get(id);
        if (node.options) {
            assert(node.options.length > 0, `No options at ${id}`);
            for (const option of node.options) visit(option.next, new Set([...ancestors, id]));
        } else {
            assert(resultsMapping[category][id], `Unknown result ${category}/${id}`);
            leaves++;
        }
    }
    visit(tree[category][0].id);
    for (const value of Object.keys(resultsMapping[category])) {
        assert(visited.has(value), `Unreachable value ${category}/${value}`);
        assert(descriptions[value], `Missing description ${value}`);
        assert(fs.existsSync(path.join(root, 'icons', category, value + '.svg')), `Missing badge ${value}`);
    }
}
const labels = new Set(Object.values(denominationMapping));
for (const family of Object.values(denominationFamilies)) {
    for (const label of family) assert(labels.has(label), `Unknown denomination ${label}`);
}
const familyEntries = Object.values(denominationFamilies).flat();
assert.equal(familyEntries.length, labels.size, 'Every profile appears in exactly one family');
assert.equal(new Set(familyEntries).size, labels.size);
for (const [key, label] of Object.entries(denominationMapping)) {
    const represented = new Set(key.split('|').map(value => HV.categoryOf[value]));
    for (const category of categories) {
        assert(represented.has(category) || context.app.denominationCategoryNotes[label]?.[category],
            `Unexplained category gap: ${label}/${category}`);
    }
    const answers = {};
    for (const value of key.split('|')) {
        const cat = HV.categoryOf[value];
        assert(cat, `Unknown profile value ${value}`);
        (answers[cat] ||= []).push({ value, agree: 1 });
    }
    const ranked = HV.rankDenominations(answers);
    assert.equal(ranked[0].label, label, `Full profile should match ${label}`);
    assert(Math.abs(ranked.reduce((sum, item) => sum + item.probability, 0) - 1) < 1e-10);
    console.log(`Full profile correctly matches ${label}`);
}
assert.equal(Object.keys(HV.loadAnswers()).length, 0, 'Must not import HyperValues answers');
const easternKey = Object.keys(denominationMapping).find(key => denominationMapping[key] === 'Eastern Orthodoxy');
const orthodoxAnswers = {};
for (const value of easternKey.split('|').filter(value => value !== 'chalcedonian_dyophysitism')) {
    (orthodoxAnswers[HV.categoryOf[value]] ||= []).push({ value, agree: 1 });
}
const pairOf = answers => HV.rankDenominations(answers).filter(item => item.label === 'Eastern Orthodoxy' || item.label === 'Oriental Orthodoxy');
const assertEqualOrthodox = answers => {
    const pair = pairOf(answers);
    assert(Math.abs(pair[0].probability - pair[1].probability) < 1e-12, 'Equally supported Orthodox profiles must receive equal probabilities');
    assert.equal(HV.percent(pair[0].probability), HV.percent(pair[1].probability));
};
assertEqualOrthodox(orthodoxAnswers);
assert.equal(HV.resultSummary(HV.closestDenominations(orthodoxAnswers, null, 5)).joint, false, 'Missing Christology must not activate the composite');
orthodoxAnswers.christology = [{ value: 'chalcedonian_dyophysitism', agree: 1 }, { value: 'miaphysitism', agree: 1 }];
const shared = HV.resultSummary(HV.closestDenominations(orthodoxAnswers, null, 5));
assert.equal(shared.label, 'Eastern Orthodox/Oriental Orthodox');
assert.equal(shared.members.length, 2);
assert.equal(shared.next.some(item => item.label.includes('Orthodoxy')), false);
for (const level of [-1, -0.5, 0, 0.5, 1]) {
    orthodoxAnswers.christology = [{ value: 'chalcedonian_dyophysitism', agree: level }, { value: 'miaphysitism', agree: level }];
    assertEqualOrthodox(orthodoxAnswers);
    assert.equal(HV.closestDenominations(orthodoxAnswers, null, 5).some(item => item.joint), level > 0, 'Only positive agreement activates the composite');
}
for (const [value, expected] of [['chalcedonian_dyophysitism', 'Eastern Orthodoxy'], ['miaphysitism', 'Oriental Orthodoxy']]) {
    orthodoxAnswers.christology = [{ value, agree: 1 }];
    const separate = HV.closestDenominations(orthodoxAnswers, null, 5);
    assert.equal(separate[0].label, expected, 'A single Christology value keeps the individual match');
    assert(!separate.some(item => item.joint));
    orthodoxAnswers.christology.push({value: value === 'miaphysitism' ? 'chalcedonian_dyophysitism' : 'miaphysitism', agree: 0});
    assert(!HV.closestDenominations(orthodoxAnswers, null, 5).some(item => item.joint), 'Neutral agreement does not count as holding both');
    orthodoxAnswers.christology[1].agree = -1;
    assert(!HV.closestDenominations(orthodoxAnswers, null, 5).some(item => item.joint), 'Opposition does not count as holding both');
}
orthodoxAnswers.christology = [{ value: 'chalcedonian_dyophysitism', agree: 1 }, { value: 'miaphysitism', agree: 0.5 }];
assert.equal(pairOf(orthodoxAnswers)[0].label, 'Eastern Orthodoxy', 'Stronger dyophysitism agreement favours Eastern Orthodoxy');
assert.equal(HV.resultSummary(HV.closestDenominations(orthodoxAnswers, null, 5)).joint, true, 'Composite also includes unequal underlying matches');
const easternShare = pairOf(orthodoxAnswers)[0].probability;
orthodoxAnswers.christology = [{ value: 'chalcedonian_dyophysitism', agree: 0.5 }, { value: 'miaphysitism', agree: 1 }];
assert.equal(pairOf(orthodoxAnswers)[0].label, 'Oriental Orthodoxy', 'Stronger miaphysitism agreement favours Oriental Orthodoxy');
assert(Math.abs(pairOf(orthodoxAnswers)[0].probability - easternShare) < 1e-8, 'Swapping equally strong distinguishing answers gives symmetric probabilities');
console.log('Orthodox scoring regression passed: equal support, neutral/opposite answers, and symmetric preference changes.');
const raw = HV.rankDenominations(orthodoxAnswers);
const combined = HV.compositeMatches(raw, orthodoxAnswers);
assert.equal(combined.length, labels.size - 1, 'The Orthodox composite replaces exactly two profiles with one result');
assert(Math.abs(combined.reduce((sum, item) => sum + item.probability, 0) - 1) < 1e-12, 'Composite probabilities remain normalized');
const composite = combined.find(item => item.joint);
assert.equal(composite.probability, raw.filter(item => item.label.includes('Orthodoxy')).reduce((sum,item) => sum + item.probability,0));
const synthetic = HV.compositeMatches([
    {label:'Roman Catholicism', probability:0.4, identicalCount:1,totalRequired:9},
    {label:'Eastern Orthodoxy', probability:0.1986, identicalCount:1,totalRequired:9},
    {label:'Oriental Orthodoxy', probability:0.4014, identicalCount:1,totalRequired:9}
], orthodoxAnswers);
assert.equal(synthetic[0].label, 'Eastern Orthodox/Oriental Orthodox', 'Combined share must determine the rank');
assert(Math.abs(synthetic[0].probability - 0.6) < 1e-12);
console.log('Composite scoring passed: summed shares, normalized totals, unequal members and combined ranking.');

const palamiteAnswers = { theology_proper: [{ value: 'palamite_panentheism', agree: 1 }] };
assert.equal(HV.closestDenominations(palamiteAnswers, null, 6)[0].label, 'Eastern Orthodoxy');
const syriacAnswers = { christology: [{ value: 'eastern_syriac_christology', agree: 1 }] };
assert.equal(HV.closestDenominations(syriacAnswers, null, 6)[0].label, 'Assyrian Church of the East');
assert(!HV.closestDenominations(syriacAnswers, null, 6).some(item => item.joint), 'East Syriac Christology must not activate the Orthodox composite');
assert(HV.stancesByCategory('Eastern Orthodoxy').theology_proper.some(item => item.value === 'palamite_panentheism'));
const baselineContext = vm.createContext({});
vm.runInContext(read('data.js') + '\nObject.keys(denominationSupplementaryValues).forEach(key => delete denominationSupplementaryValues[key]);\n' +
    read('scoring.js') + '\nglobalThis.score = HV.rankDenominations;', baselineContext);
const baselineRank = baselineContext.score(orthodoxAnswers);
const withOptional = HV.rankDenominations(orthodoxAnswers);
for (const item of withOptional) {
    assert(Math.abs(item.probability - baselineRank.find(other => other.label === item.label).probability) < 1e-12,
        'Unanswered supplementary values must not change probabilities');
}
console.log('New values passed: Palamite/Eastern Orthodox affinity, East Syriac/Church of the East matching, and unanswered-value invariance.');

const answers = { theology_proper: [{ value: 'classical_trinitarianism', agree: 1 }, { value: 'monarchical_trinitarianism', agree: -0.5 }] };
HV.saveAnswers(answers);
assert.equal(JSON.stringify(HV.loadAnswers()), JSON.stringify(answers), 'Multiple values and sliders persist');
assert.equal(HV.primaryOf(answers.theology_proper), 'classical_trinitarianism');
assert.equal(HV.valueScore('monarchical_trinitarianism', answers, 1), -0.5);
assert(saved.get('quizAnswers').includes('state_socialism'), 'Original storage must remain untouched');
saved.set('hyperTheoValues.answers', 'invalid JSON');
assert.equal(HV.loadAnswers().theology_proper[0].value, 'classical_trinitarianism', 'Primary answers recover from invalid storage');
// Legacy duplicates consolidate without double-counting or inventing a narrower view.
saved.set('hyperTheoValues.answers', JSON.stringify({
    theology_proper: [{value:'creedal_trinitarianism',agree:1}],
    sacramentology: [{value:'non_ritual_sacramentality',agree:1},{value:'asacramentalism',agree:0.5}]
}));
const migrated = HV.loadAnswers();
assert(!migrated.theology_proper, 'Retired umbrellas must not imply a narrower belief');
assert.equal(migrated.sacramentology.length, 1, 'Merged values must not count twice');
assert.equal(migrated.sacramentology[0].value, 'asacramentalism');
assert.equal(migrated.sacramentology[0].agree, 0.5, 'Explicit canonical answer takes precedence');
assert(saved.get('hyperTheoValues.beforeValueCleanup').includes('creedal_trinitarianism'), 'Original answers are backed up');
vm.runInContext('globalThis.aliases = valueAliases;', context);
for (const old of Object.keys(context.aliases)) {
    assert(!HV.categoryOf[old], `Retired overlapping value was reintroduced: ${old}`);
}
console.log('Value cleanup passed: retired umbrellas, merged synonyms, saved-answer deduplication and backup.');
for (const file of fs.readdirSync(root).filter(file => /\.(js|html)$/.test(file))) {
    const source = read(file);
    if (file.endsWith('.js')) new vm.Script(source, { filename: file });
    else {
        for (const script of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(script[1], { filename: file });
        for (const match of source.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
            const url = match[1];
            if (/^(?:https?:|#|\?|data:|mailto:)/.test(url) || url.includes('${')) continue;
            assert(fs.existsSync(path.join(root, url.split(/[?#]/)[0])), `Missing local asset ${file}: ${url}`);
        }
    }
}
console.log(`Passed: ${categories.length} category trees, ${leaves} reachable results, ${labels.size} denomination profiles, storage isolation, and script/asset checks.`);
