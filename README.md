# HyperTheoValues

A local adaptation of HyperValues with TheoValues content, 68 theological values, and 18 denomination profiles across nine categories.

## Run locally

Run `python -m http.server 8000` from this folder, then open http://localhost:8000. HTTP is required for loading the question tree.

## Features

- Category dashboard and decision-tree quiz with previous-question navigation.
- Multiple values per category, agreement sliders, removal, and saved answers.
- Ranked denomination matches, profile comparisons, and phone/desktop image downloads.
- Light/dark themes and separate browser storage from the original projects.

## Profiles and families

The catalogue retains the original five TheoValues profiles and adds Assyrian Church of the East, Confessional Anglican, United Methodist, Southern Baptist, Assemblies of God, Seventh-day Adventist, Church of the Nazarene, Salvation Army, Quaker (unprogrammed), United Pentecostal Church International, Jehovah's Witnesses, Latter-day Saints, and Christian Science.

Southern Baptist, Assemblies of God, Seventh-day Adventist, and UPCI profiles share the **Neoprotestant** family. Other families retain their distinct groupings.

Every profile covers all categories using distinct scored values or descriptive notes. Shared general teachings and genuinely diverse positions are documented without introducing extra umbrella values. See [PROFILE_COVERAGE.md](PROFILE_COVERAGE.md) for the full table.

The catalogue contains the original 66 TheoValues values plus the explicitly requested Palamite Panentheism and Eastern Syriac. All ten remaining values introduced during denomination expansion have been removed. Profiles retain their supported original values and use notes where the retained choices do not fit. [VALUE_DESIGN.md](VALUE_DESIGN.md) records the requirement to avoid duplicate or umbrella values.

When a general doctrinal statement does not identify one of the narrower positions, the denomination receives a descriptive category note instead of an invented score. Existing synonym IDs migrate to their canonical values without double-counting. Retired umbrella answers do not imply a narrower belief; original answers are retained in the browser backup key `hyperTheoValues.beforeValueCleanup`.

Eastern Syriac retains the supplied formulation: two natures (kyānē), two qnōmē, and one person (parṣōpā) of Sonship. The Catholic–Assyrian declaration supports the accompanying divine/human personal-union account; it is not cited as the source of the supplied Syriac terminology.

## Scoring

HyperValues' scoring engine uses a uniform penalty for unlisted values, so the frequency of a belief in unrelated profiles does not bias equally supported alternatives. Percentages are relative model shares, sensitive to the catalogue and profile definitions, rather than validated probabilities of affiliation.

Eastern and Oriental Orthodox shares combine into one **Eastern Orthodox/Oriental Orthodox** result only when the user positively agrees with both Dyophysitism and Miaphysitism. Otherwise the profiles remain separate. Images and the results page use the same calculation.

Palamite Panentheism is supplementary evidence for the Eastern Orthodox profile. Leaving it unanswered does not enlarge that profile's completeness requirement. The label is used for the essence–energies account, preserving the Creator-creature distinction, separately from Process Panentheism.

Values not mapped by a profile are not automatically treated as doctrinal rejection. The inherited statistical model nevertheless penalizes unlisted positive answers, so model shares should be read with that practical limitation in mind.

## Verification

Run `node tools/check_integration.js` for question reachability, category coverage, full-profile matching, probability symmetry, conditional composites, storage isolation, value migrations, and script/asset checks.

Run `node --experimental-websocket tools/check_browser.js` for browser checks using installed Chrome or Edge. Set `BROWSER_PATH` for another Chromium executable. The test uses its own server and temporary browser profile.

## Attribution and license

Application foundation: [HyperValues](https://github.com/hyperzen2773/hypervalues) by hyperzen2773. Original theological content: [TheoValues](https://github.com/neomediavalist/theovalues) by neomediavalist. HyperValues credits [NeoValues](https://github.com/neomediavalist/neovalues) by neomediavalist.

Changes include application/content integration, denomination terminology and family grouping, additional sourced values and profiles, abbreviation badges, isolated saved state, category coverage notes, scoring corrections, conditional composite matches, and integration checks.

Distributed under CC BY-NC-SA 4.0. See [LICENSE](LICENSE).

Value labels use specific doctrinal names, including Ecclesial Egalitarianism and Moral Exemplarism. Established exceptions such as Eastern Syriac, Theosis, and the Scriptura terms remain. Label changes preserve the existing IDs, definitions, saved answers, and scores.
