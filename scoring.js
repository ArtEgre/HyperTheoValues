// Shared scoring helpers for results.html, quiz.html and description.html. Load data.js first.
//
// Your answers (see loadAnswers) map a category to the values you added in it, each with how much it matches you,
// from -1 (opposite) through 0 (neutral) to +1 (match). A category you did not touch is missing.
//
// The denominations are ranked by a Bayesian model of how a person holding an denomination would answer. Its stances
// (denominationScores in data.js, from -1 for "opposes the value" to +1 for "matches it") are the expected answers.
// Every value you added counts as an answer, including one you left at 0 (neutral); a value you did not add is not an answer.
// For an denomination j:
//   - a value j has a stance on: your answer is that stance plus noise (normal, width tau);
//   - a value j has no stance on: you added something it never mentions, which is less likely (probability
//     epsilon, the same for every unlisted value). A neutral answer on such a value costs
//     nothing: an denomination that never mentions a value is not contradicted by someone who is neutral about it;
//   - which of j's stances you chose to answer: an denomination that lists few values and matches all of them
//     explains your answers better than one that lists many (the log of the number of possible choices).
// How wide your noise is, and how often you add values, are not known, so the model averages over several
// tau and epsilon (BAYES below) instead of picking one. The denominations are ranked by that average likelihood,
// from the best to the worst. There is no training and no weights file: adding an denomination or a value to data.js
// is enough.
// The number shown is each denomination's probability: its likelihood divided by the sum over all denominations, with equal chances
// to start with. It is relative to the other denominations: answers that fit none of them still give the best one a share.
// Ties go to the denomination with more values you picked that it holds, then with more values listed, then to the
// order in data.js. closestDenominations keeps only denominations that hold at least one value you picked.

const HV = (function () {
    const categoryOf = {};
    Object.keys(resultsMapping).forEach(cat => {
        Object.keys(resultsMapping[cat]).forEach(id => {
            if (!(id in categoryOf)) categoryOf[id] = cat;
        });
    });

    // Order of the denominations in data.js
    const labelOrder = {};
    Object.keys(denominationMapping).forEach(key => {
        const label = denominationMapping[key];
        if (!(label in labelOrder)) labelOrder[label] = Object.keys(labelOrder).length;
    });

    // Stances of every denomination: { label: { value: stance } }, parsed from "value:score|value:score"
    // An denomination without scores falls back to the first of its old value sets, every value at +1.
    const stancesOf = {};
    Object.keys(labelOrder).forEach(label => {
        const stances = {};
        const text = (typeof denominationScores !== 'undefined' && denominationScores[label]) || '';
        text.split('|').forEach(part => {
            const at = part.lastIndexOf(':');
            if (at < 1) return;
            const value = part.slice(0, at);
            const stance = Number(part.slice(at + 1));
            if (categoryOf[value] && stance >= -1 && stance <= 1 && stance !== 0) stances[value] = stance;
        });
        if (!Object.keys(stances).length) {
            const firstKey = Object.keys(denominationMapping).find(key => denominationMapping[key] === label);
            if (firstKey) firstKey.split('|').forEach(value => { if (categoryOf[value]) stances[value] = 1; });
        }
        Object.entries(denominationSupplementaryValues[label] || {}).forEach(([value, stance]) => {
            if (categoryOf[value] && Number.isFinite(stance) && stance !== 0 && Math.abs(stance) <= 1) {
                stances[value] = stance;
            }
        });
        stancesOf[label] = stances;
    });

    // What the user answered: { category: [{ value, agree }] }. Answers saved by an older version
    // (one value per category) count as agreement 1.
    function loadAnswers() {
        let answers = null;
        try { answers = JSON.parse(localStorage.getItem('hyperTheoValues.answers') || 'null'); } catch (e) { answers = null; }
        if (answers && typeof answers === 'object') {
            Object.keys(answers).forEach(cat => {          // a category without values counts as not touched
                if (!Array.isArray(answers[cat]) || !answers[cat].length) delete answers[cat];
            });
            return normalizeAnswers(answers);
        }
        let old = {};
        try { old = JSON.parse(localStorage.getItem('hyperTheoValues.results') || '{}') || {}; } catch (e) { old = {}; }
        answers = {};
        Object.keys(old).forEach(cat => {
            if (old[cat]) answers[cat] = [{ value: old[cat], agree: 1 }];
        });
        return normalizeAnswers(answers);
    }

    // Consolidate legacy synonyms without guessing a narrower belief for a
    // retired umbrella. Keep the original saved state for recovery.
    function normalizeAnswers(answers) {
        const normalized = {};
        let changed = false;
        Object.entries(answers).forEach(([category, list]) => {
            if (!Array.isArray(list)) return;
            list.forEach(item => {
                if (!item || typeof item.value !== 'string') return;
                const value = Object.prototype.hasOwnProperty.call(valueAliases, item.value)
                    ? valueAliases[item.value] : item.value;
                if (value !== item.value) changed = true;
                if (!value || categoryOf[value] !== category) return;
                const entries = normalized[category] || (normalized[category] = []);
                const existing = entries.find(entry => entry.value === value);
                if (!existing) entries.push({ value, agree: item.agree });
                else {
                    changed = true;
                    // Preserve the answer to the canonical value when supplied.
                    if (item.value === value) existing.agree = item.agree;
                }
            });
        });
        if (changed) {
            try {
                if (!localStorage.getItem('hyperTheoValues.beforeValueCleanup')) {
                    localStorage.setItem('hyperTheoValues.beforeValueCleanup', JSON.stringify(answers));
                }
            } catch (e) { /* storage unavailable */ }
        }
        return normalized;
    }

    // Saves your answers, and the value you agree with most in each category, in the browser
    function saveAnswers(answers) {
        const primary = {};
        Object.keys(answers).forEach(category => {
            const value = primaryOf(answers[category]);
            if (value) primary[category] = value;
        });
        try {
            localStorage.setItem('hyperTheoValues.answers', JSON.stringify(answers));
            localStorage.setItem('hyperTheoValues.results', JSON.stringify(primary));
        } catch (e) { /* storage is not available: nothing to save */ }
    }

    // The value you agreed with most in a category (the first one if tied), or null if you agreed with none
    function primaryOf(list) {
        let best = null;
        (list || []).forEach(item => {
            if (item.agree > 0 && (!best || item.agree > best.agree)) best = item;
        });
        return best ? best.value : null;
    }

    // An agreement or a score as text: +0.60, 0.00, \u22120.40
    function signed(number) {
        const rounded = Math.round(number * 100) / 100;
        return (rounded > 0 ? '+' : (rounded < 0 ? '\u2212' : '')) + Math.abs(rounded).toFixed(2);
    }

    // Score of one value of an denomination against your answer for it, from -1 to +1 (0 if you did not add it):
    // your agreement times the denomination's stance, so matching a value it matches or opposing one it opposes is
    // positive and the other two cases are negative
    // A probability (0 to 1) as text with one decimal, never 0% or 100% unless it is exactly so
    function percent(probability) {
        const value = Math.max(0, Math.min(1, Number(probability) || 0)) * 100;
        if (value < 0.1) return '<0.1%';
        if (value > 99.9) return '>99.9%';
        return value.toFixed(1) + '%';
    }
    function valueScore(reqVal, answers, stance) {
        const list = answers[categoryOf[reqVal]];
        const entry = list && list.find(item => item.value === reqVal);
        if (!entry) return 0;
        const given = stance === undefined ? 1 : stance;
        return Math.max(-1, Math.min(1, (Number(entry.agree) || 0) * given));
    }

    // Ring color for a score: dark red at -1, gray at 0, dark green at +1
    const RING_RED = [168, 29, 29];
    const RING_GRAY = [139, 148, 158];
    const RING_GREEN = [26, 127, 55];
    function ringColor(score) {
        const t = Math.min(1, Math.abs(score));
        const end = score < 0 ? RING_RED : RING_GREEN;
        const rgb = RING_GRAY.map((from, i) => Math.round(from + (end[i] - from) * t));
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    // The values an denomination mentions, by category: { category: [{ value, stance }] }, strongest stance first
    function stancesByCategory(label) {
        const byCategory = {};
        const stances = stancesOf[label] || {};
        Object.keys(stances).forEach(value => {
            const cat = categoryOf[value];
            if (cat) (byCategory[cat] = byCategory[cat] || []).push({ value, stance: stances[value] });
        });
        Object.keys(byCategory).forEach(cat => {
            byCategory[cat].sort((a, b) => Math.abs(b.stance) - Math.abs(a.stance));
        });
        return byCategory;
    }

    // How your answers meet the definition of an denomination: values you picked that it holds, other values of its
    // that you answered, and how many values it lists
    function countsOf(answers, label) {
        const stances = stancesOf[label] || {};
        let identicalCount = 0;
        let mismatchCount = 0;
        Object.keys(stances).forEach(value => {
            const list = answers[categoryOf[value]];
            const entry = list && list.find(item => item.value === value);
            if (!entry) return;
            if (stances[value] > 0 && Number(entry.agree) > 0) identicalCount++;
            else mismatchCount++;
        });
        const supplementary = denominationSupplementaryValues[label] || {};
        const totalRequired = Object.keys(stances).filter(value => {
            if (!Object.prototype.hasOwnProperty.call(supplementary, value)) return true;
            return (answers[categoryOf[value]] || []).some(item => item.value === value &&
                item.agree !== null && item.agree !== undefined && Number.isFinite(Number(item.agree)));
        }).length;
        return { identicalCount, mismatchCount, totalRequired };
    }

    const rounded = score => Math.round(score * 1e9);

    // Higher likelihood first; then more values you picked that it holds; then more values listed.
    // Equal in all: the order in data.js decides.
    function compareItems(a, b) {
        return (rounded(b.rankScore) - rounded(a.rankScore)) ||
            (b.identicalCount - a.identicalCount) ||
            (b.totalRequired - a.totalRequired) ||
            (labelOrder[a.label] - labelOrder[b.label]);
    }

    // ---------------------------------------------------------------------------------------------
    // The Bayesian ranking (built from the stances in data.js when the page loads)
    // ---------------------------------------------------------------------------------------------

    // tau: width of the noise around a stance; epsilon: chance of adding an
    // unlisted value. The same epsilon applies to every profile and value:
    // unrelated profiles must not bias equally supported alternatives.
    const BAYES = { taus: [0.15, 0.3, 0.6, 0.9], epsilons: [0.01, 0.05] };

    const model = (function () {
        const labels = Object.keys(labelOrder);
        const values = Object.keys(categoryOf);
        const valueIndex = {};
        values.forEach((value, i) => { valueIndex[value] = i; });
        const N = labels.length;
        const V = values.length;
        const stance = labels.map(label => {
            const row = new Float64Array(V);
            const own = stancesOf[label] || {};
            Object.keys(own).forEach(value => { if (value in valueIndex) row[valueIndex[value]] = own[value]; });
            return row;
        });
        const supplementary = labels.map(label => new Set(
            Object.keys(denominationSupplementaryValues[label] || {}).map(value => valueIndex[value])
                .filter(index => index !== undefined)
        ));
        const listed = stance.map((row, j) => row.reduce((count, s, i) =>
            count + (s !== 0 && !supplementary[j].has(i) ? 1 : 0), 0));
        // Uniform log penalty for an unlisted answer, averaged over epsilon.
        const logAdd = BAYES.epsilons.map(epsilon => Math.log(epsilon));

        const logFactorial = [0];
        for (let k = 1; k <= V; k++) logFactorial[k] = logFactorial[k - 1] + Math.log(k);

        return { labels, valueIndex, N, V, stance, listed, supplementary, logAdd, logFactorial };
    })();

    // Every denomination, best first. rankScore: ln of the average likelihood; probability: its share among all
    // denominations (equal chances to start with), 0 to 1
    function rankDenominations(answers) {
        const given = [];
        Object.keys(answers).forEach(cat => (answers[cat] || []).forEach(item => {
            const i = model.valueIndex[item.value];
            const level = Number(item.agree);
            if (i === undefined || item.agree === null || item.agree === undefined || !Number.isFinite(level)) return;
            given.push([i, Math.max(-1, Math.min(1, level))]);
        }));
        const { labels, N, stance, listed, supplementary, logAdd, logFactorial } = model;
        const combos = BAYES.taus.length * BAYES.epsilons.length;
        const logCombos = Math.log(combos);
        const rank = new Array(N);
        const silent = new Array(BAYES.epsilons.length);

        for (let j = 0; j < N; j++) {
            let matched = 0;
            let effectiveListed = listed[j];
            let squares = 0;
            silent.fill(0);
            for (let g = 0; g < given.length; g++) {
                const i = given[g][0];
                const x = given[g][1];
                const s = stance[j][i];
                if (s !== 0) {
                    if (supplementary[j].has(i)) effectiveListed++;
                    matched++;
                    squares += (x - s) * (x - s);
                } else if (x !== 0) {
                    for (let e = 0; e < silent.length; e++) silent[e] += logAdd[e];
                }
            }
            let likelihood = 0;
            if (given.length) {
                const choice = -(logFactorial[effectiveListed] - logFactorial[matched] - logFactorial[effectiveListed - matched]);
                const terms = [];
                BAYES.taus.forEach(tau => {
                    const perMatch = -Math.log(tau) - 0.5 * Math.log(2 * Math.PI) + Math.log(2);
                    for (let e = 0; e < silent.length; e++) {
                        terms.push(-squares / (2 * tau * tau) + matched * perMatch + silent[e] + choice);
                    }
                });
                const top = Math.max.apply(null, terms);
                likelihood = top + Math.log(terms.reduce((sum, t) => sum + Math.exp(t - top), 0)) - logCombos;
            }
            rank[j] = { label: labels[j], rankScore: likelihood };
        }

        const best = Math.max.apply(null, rank.map(item => item.rankScore));
        const total = rank.reduce((sum, item) => sum + Math.exp(item.rankScore - best), 0);
        return rank
            .map(item => Object.assign(countsOf(answers, item.label), {
                key: item.label,
                label: item.label,
                rankScore: item.rankScore,
                probability: Math.exp(item.rankScore - best) / total
            }))
            .sort(compareItems);
    }

    // Combine Orthodox profile shares only when both Christology values are held.
    // This pools the existing model probabilities; it does not add another profile
    // or count the shared values twice.
    function compositeMatches(ranked, answers = {}) {
        const christology = answers.christology || [];
        const supportsBoth = ['chalcedonian_dyophysitism', 'miaphysitism'].every(value =>
            christology.some(item => item.value === value &&
                Number.isFinite(Number(item.agree)) && Number(item.agree) > 0));
        if (!supportsBoth) return ranked.slice();
        const grouped = new Set(Object.values(denominationComposites).flat());
        const matches = ranked.filter(item => !grouped.has(item.label));
        Object.entries(denominationComposites).forEach(([label, labels]) => {
            const members = labels.map(name => ranked.find(item => item.label === name)).filter(Boolean);
            if (!members.length) return;
            const probability = members.reduce((total, item) => total + item.probability, 0);
            matches.push({
                label, key: label, probability, rankScore: Math.log(probability),
                identicalCount: Math.max(...members.map(item => item.identicalCount)),
                totalRequired: Math.max(...members.map(item => item.totalRequired)),
                joint: true, members
            });
        });
        return matches.sort((a, b) => b.probability - a.probability);
    }

    // Rank composites alongside individual denominations, then apply display filters.
    function closestDenominations(answers, excludeLabel, count) {
        return compositeMatches(rankDenominations(answers), answers)
            .filter(item => item.label !== excludeLabel && item.identicalCount > 0)
            .slice(0, count);
    }

    function resultSummary(ranked) {
        const best = ranked[0];
        if (!best) return null;
        return {
            label: best.label,
            joint: !!best.joint, members: best.members || [best],
            color: denominationColors[best.label] || '#7a7a7a',
            scoreText: percent(best.probability),
            next: ranked.slice(1)
        };
    }

    return {
        categoryOf, loadAnswers, saveAnswers, primaryOf, signed, percent, stancesByCategory, rankDenominations, closestDenominations,
        valueScore, ringColor, resultSummary, compositeMatches
    };
})();
