// HyperTheoValues content. Read VALUE_DESIGN.md before adding or changing values.

const categories = [
    "theology_proper",
    "christology",
    "bibliology",
    "pneumatology",
    "hamartiology",
    "sacramentology",
    "soteriology",
    "ecclesiology",
    "eschatology"
];

const categoryTitles = {
    "theology_proper": "Theology Proper",
    "christology": "Christology",
    "bibliology": "Bibliology",
    "pneumatology": "Pneumatology",
    "hamartiology": "Hamartiology",
    "sacramentology": "Sacramentology",
    "soteriology": "Soteriology",
    "ecclesiology": "Ecclesiology",
    "eschatology": "Eschatology"
};

const resultsMapping = {
    "theology_proper": {
        "classical_trinitarianism": "Classical Trinitarianism",
        "monarchical_trinitarianism": "Monarchical Trinitarianism",
        "palamite_panentheism": "Palamite Panentheism",
        "social_trinitarianism": "Social Trinitarianism",
        "unitarian_monotheism": "Unitarian Monotheism",
        "modalistic_monarchianism": "Modalistic Monarchianism",
        "binitarianism": "Binitarianism",
        "tritheism": "Tritheism",
        "process_panentheism": "Process Panentheism",
        "monistic_idealism": "Monistic Idealism"
    },
    "christology": {
        "chalcedonian_dyophysitism": "Dyophysitism",
        "miaphysitism": "Miaphysitism",
        "eastern_syriac_christology": "Eastern Syriac",
        "nestorianism": "Nestorianism",
        "monophysitism": "Monophysitism",
        "celestial_flesh": "Celestial Flesh",
        "subordinationism": "Subordinationism",
        "arianism": "Arianism",
        "angelomorphism": "Angelomorphism",
        "premortal_firstborn": "Premortal Firstborn",
        "socinianism": "Socinianism",
        "adoptionism": "Adoptionism",
        "docetism": "Docetism"
    },
    "bibliology": {
        "magisterialism": "Magisterialism",
        "conciliarism": "Conciliarism",
        "prima_scriptura": "Prima Scriptura",
        "sola_scriptura": "Sola Scriptura",
        "nuda_scriptura": "Nuda Scriptura",
        "continuing_revelation": "Continuing Revelation",
        "spiritualism": "Spiritualism",
        "neo_orthodoxy": "Neo-Orthodoxy",
        "modernism": "Modernism"
    },
    "pneumatology": {
        "glossolalism": "Glossolalism",
        "continuationism": "Continuationism",
        "cessationism": "Cessationism",
        "perfectionism": "Perfectionism",
        "sacramentalism": "Sacramentalism",
        "dynamism": "Dynamism",
        "immanentism": "Immanentism"
    },
    "hamartiology": {
        "total_depravity": "Total Depravity",
        "wounded_nature": "Wounded Nature",
        "ancestral_sin": "Ancestral Sin",
        "pelagianism": "Pelagianism",
        "necessary_fall": "The Necessary Fall",
        "naturalism": "Naturalism",
        "spiritual_idealism": "Spiritual Idealism"
    },
    "sacramentology": {
        "transubstantiation": "Transubstantiation",
        "mystical_realism": "Mystical Realism",
        "sacramental_union": "Sacramental Union",
        "pneumatic_presence": "Pneumatic Presence",
        "baptismal_remission": "Baptismal Remission",
        "memorialism": "Memorialism",
        "asacramentalism": "Asacramentalism"
    },
    "soteriology": {
        "forensic_justification": "Forensic Justification",
        "infused_righteousness": "Infused Righteousness",
        "theosis": "Theosis",
        "covenantal_nomism": "Covenantal Nomism",
        "moral_influence": "Moral Exemplarism"
    },
    "ecclesiology": {
        "centralism": "Centralism",
        "episcopacy": "Episcopacy",
        "presbyterianism": "Presbyterianism",
        "congregationalism": "Congregationalism",
        "non_clerical": "Ecclesial Egalitarianism"
    },
    "eschatology": {
        "amillennialism": "Amillennialism",
        "premillennialism": "Premillennialism",
        "dispensationalism": "Dispensationalism",
        "postmillennialism": "Postmillennialism",
        "preterism": "Preterism"
    }
};

const descriptions = {
    "palamite_panentheism": "Used here for a Palamite account of divine presence: God remains transcendent and unknowable in His essence, while His uncreated energies sustain creation and communicate divine life by grace. Creation is not God's essence. This account preserves the Creator-creature distinction and does not make God dependent on an evolving cosmos. The label 'panentheism' has different uses; this value specifically denotes the essence-energies distinction, compatible with Monarchical Trinitarianism.",
    "eastern_syriac_christology": "Two natures (kyānē), two qnōmē, and one person (parṣōpā) of Sonship. Christ is fully divine and fully human, with the distinct properties of divinity and humanity preserved in an inseparable union.",
    "Assyrian Church of the East": "An apostolic church of the East Syriac tradition. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "classical_trinitarianism": "God is one undivided, immaterial essence eternally subsisting as three co-equal persons (Father, Son, and Holy Spirit), defined by divine simplicity, immutability, and impassibility.",
    "monarchical_trinitarianism": "Affirms three consubstantial divine persons, with the unity of the Trinity grounded in the Father as the source: the Son is eternally begotten of the Father and the Holy Spirit eternally proceeds from the Father. This value concerns Trinitarian relations; Palamite Panentheism separately addresses divine essence and energies.",
    "social_trinitarianism": "Envisions the Trinity as an egalitarian communion of three distinct personal subjects and centers of consciousness bound by mutual, self-giving indwelling (perichoresis).",
    "unitarian_monotheism": "Holds that God is strictly and numerically one single person—the Father alone—denying deity or eternal pre-existence to the Son and viewing the Holy Spirit as God's impersonal active power.",
    "modalistic_monarchianism": "Maintains that God is one single person without internal personal distinctions, revealing Himself successively in the modes or roles of Father, Son, and Holy Spirit under the name of Jesus.",
    "binitarianism": "Affirms that the divine nature consists of exactly two eternal, co-equal divine persons—the Father and the Word (Son)—while defining the Holy Spirit as the shared divine presence or power.",
    "tritheism": "Holds that the Godhead consists of three separate, individual divine beings (Father, Son, and Holy Ghost) united in purpose and perfection rather than substance, with the Father and Son possessing physical bodies.",
    "process_panentheism": "Posits that God and the physical universe are interdependent and co-eternal, wherein the world exists within an evolving divine nature that affects and is affected by creaturely agency.",
    "monistic_idealism": "Asserts that God as Infinite Divine Mind or Spirit is the sole, all-encompassing reality, regarding physical matter, sin, and bodily death as metaphysical errors of mortal consciousness.",
    "chalcedonian_dyophysitism": "Jesus Christ is one personal hypostasis existing eternally in two whole, unconfused, distinct, and indivisible natures—fully God and fully man—possessing both a divine will and a human will.",
    "miaphysitism": "Christ is one incarnate person possessing a single unified divine-human nature (mia physis) without mixture or confusion, rejecting the post-incarnation division of Christ into two separate ongoing natures.",
    "nestorianism": "The divine Word and the human man Jesus retain distinct hypostases loosely united in an external prosopic union, distinguishing the divine Logos from the human temple who suffered on the cross.",
    "monophysitism": "In the Incarnation, Christ's human nature was entirely absorbed and dissolved by His divine nature like a drop of water into the sea, leaving Christ with an exclusively divine nature.",
    "celestial_flesh": "Christ did not receive His physical body from the fallen, corrupted seed of Mary, but brought a pure, holy celestial flesh directly from heaven that passed through Mary as water through a conduit.",
    "subordinationism": "The Son is truly divine, eternal, and pre-existent, begotten of the Father's essence, but eternally subordinate in rank, glory, and derived authority to the Father as the fountainhead of divinity.",
    "arianism": "Christ is a finite, created pre-existent being brought into existence by God out of nothing (ex nihilo)—the highest creation through whom the universe was made, but fundamentally not God.",
    "angelomorphism": "Christ is ontologically the first and highest created angel (specifically the Archangel Michael incarnated), who was sent to earth as a perfect human ransom and exalted back to heavenly glory.",
    "premortal_firstborn": "Jesus Christ is the Firstborn of the Father in spirit and the Only Begotten of the Father in the flesh. He existed before His earthly birth, is Jehovah and Redeemer, and carries out the Father's plan of salvation. This value follows the Latter-day Saint account without adding an unsupported timeline for attaining divinity.",
    "socinianism": "Jesus had no metaphysical pre-existence prior to his conception in Mary's womb, but was miraculously virgin-born as a mortal human prophet and exalted to Lordship by God only after his resurrection.",
    "adoptionism": "Jesus was an ordinary human being born naturally of Mary and Joseph who lived with exceptional moral piety, whom God adopted as His titular Son at his baptism or resurrection.",
    "docetism": "Christ was a purely spiritual and divine entity whose physical body, material limitations, physical suffering, and death were only visionary illusions or phantasmal appearances.",
    "magisterialism": "Divine revelation can only be authoritatively interpreted and defined by an official, living institutional teaching office or designated organizational channel whose leadership possesses divine guidance or infallibility.",
    "conciliarism": "Scripture and apostolic tradition are interpreted through the received councils and collective teaching of the Church rather than a single exclusive teaching office. Different communions recognize different sets of councils; the value does not imply recognition of every Byzantine council.",
    "prima_scriptura": "Scripture is the primary and supreme rule of faith, but it must be discerned through the dynamic coordination of Holy Tradition, human reason, and personal spiritual experience.",
    "sola_scriptura": "The closed sixty-six-book biblical canon is the sole infallible rule of faith and practice, with historic creeds and confessions serving as fallible ministerial authorities strictly subordinate to the text.",
    "nuda_scriptura": "The bare text of the Bible alone is the sole authority for believers with no creeds, catechisms, or church traditions permitted, relying solely on simple, common-sense literal reading.",
    "continuing_revelation": "The biblical canon is open and incomplete, requiring living contemporary apostles and prophets who receive ongoing public revelation, divine scripture, and restorative authority from God.",
    "spiritualism": "The immediate, living presence of the Holy Spirit (the Inner Light) within the believer is the supreme authority, to which the outward written letter of the Bible is a secondary historical witness.",
    "neo_orthodoxy": "Jesus Christ alone is the true Word of God; the Bible is a human historical witness that becomes the living Word of God dynamically whenever the Holy Spirit encounters the reader in faith.",
    "modernism": "The Bible is an ancient human cultural artifact containing historical and moral errors, possessing no binding supernatural authority and subject to evaluation by reason, science, and ethical conscience.",
    "glossolalism": "The baptism in the Holy Spirit is an empowering crisis experience distinct from and subsequent to conversion, invariably accompanied by the mandatory initial physical sign of speaking in tongues.",
    "continuationism": "All miraculous spiritual gifts distributed in the New Testament continue to operate in the church today, but speaking in tongues is not a mandatory sign of Spirit baptism.",
    "cessationism": "The Holy Spirit works primarily through the written Word of God, as all supernatural sign-gifts and revelatory manifestations permanently ceased with the close of the apostolic age.",
    "perfectionism": "The defining post-conversion work of the Holy Spirit is heart purity and moral renewal, delivering the believer from the dominion of willful sin and empowering holy living.",
    "sacramentalism": "The personal gift and seal of the Holy Spirit is conveyed objectively through the historic sacraments of the Church—primarily Baptism and Chrismation or Confirmation—administered by apostolic authority.",
    "dynamism": "The Holy Spirit is not a distinct conscious person or divine entity, but God's invisible, impersonal active force and energy by which He accomplishes His sovereign will.",
    "immanentism": "The Holy Spirit is not a supernatural metaphysical entity, but the immanent divine impulse of love, evolving moral consciousness, and ethical community within humanity.",
    "total_depravity": "Humanity inherits both Adam's legal guilt and a thoroughly corrupted nature, rendering the human will in spiritual bondage and entirely incapable of seeking or choosing God without prior sovereign regeneration.",
    "wounded_nature": "Original sin is an inherited privation of original righteousness that wounded human nature, leaving the will weakened and prone to concupiscence but still retaining the capacity to cooperate with divine grace.",
    "ancestral_sin": "Humanity inherits physical mortality, corruptibility, and an inclination toward sin from Adam, but bears zero inherited legal guilt, leaving human free will intact to respond synergistically to God.",
    "pelagianism": "There is no inherited original sin or corruption; every human is born morally neutral with the full natural capacity to choose righteousness and obey God's commands without special enabling grace.",
    "necessary_fall": "The Fall of Adam was not a tragic ruinous catastrophe, but a necessary, planned progression that opened the door to mortal physical life and ultimate spiritual exaltation.",
    "naturalism": "There was no historical Adam or cosmic Fall; human selfishness and moral failure are biological survival instincts arising from evolutionary origins rather than spiritual corruption.",
    "spiritual_idealism": "Sin, mortal limitation, and physical depravity are not metaphysical realities, but illusory errors of mortal consciousness that disappear as one recognizes human unity with the Divine Mind.",
    "transubstantiation": "In the Eucharistic sacrifice, the underlying substance of bread and wine is converted into the literal Body and Blood of Christ while outward accidents remain, with the seven sacraments working objectively ex opere operato.",
    "mystical_realism": "The Eucharistic bread and wine truly become the Body and Blood of Christ as a holy mystery, without requiring a definitive scholastic account of substance and accidents. This differs from spiritual presence alone and from a defined sacramental union of unchanged bread and wine with Christ's Body and Blood.",
    "sacramental_union": "Christ's true physical body and blood are substantially received in, with, and under the bread and wine, rejecting transubstantiation while affirming that infant baptism genuinely regenerates through the Word.",
    "pneumatic_presence": "Sacraments are covenant signs and seals wherein Christ is spiritually and pneumatically present to faith during communion, rather than physically present on the altar.",
    "baptismal_remission": "Water baptism by immersion of an accountable believer is the necessary instrument for the actual remission of sins and salvation, while the Lord's Supper functions strictly as a symbolic weekly memorial.",
    "memorialism": "Baptism and the Lord's Supper are symbolic acts of dedication, testimony, or remembrance rather than instruments that themselves confer regeneration or change bread and wine into Christ's Body and Blood. Traditions differ on who participates and when these acts occur.",
    "asacramentalism": "Baptism and communion are understood as inward spiritual realities and are practiced without requiring outward water baptism or ritual bread and wine. This value describes non-observance of the outward rites, not necessarily rejection of their use in other churches.",
    "forensic_justification": "Salvation is an instantaneous legal acquittal wherein God imputes the alien righteousness of Christ to the believer through faith alone, without human merit, obedience, or sacramental works contributing to justification.",
    "infused_righteousness": "Justification is an inward moral transformation where sanctifying grace is infused into the soul, making the believer actually righteous and requiring faith working through charity and sacramental cooperation for final salvation.",
    "theosis": "Salvation is the lifelong ontological transfiguration and deification of human nature through participation in God's uncreated divine energies, overcoming death and corruption rather than satisfying legal debt.",
    "covenantal_nomism": "Salvation is strictly conditional upon active covenant discipleship, requiring faith combined with lifelong obedience to God's commandments, moral laws, and prescribed ordinances.",
    "moral_influence": "Salvation is an inward moral and ethical awakening inspired by Christ's supreme demonstration of sacrificial love, rejecting penal substitution, blood satisfaction, and forensic legal models.",
    "centralism": "Final governing authority is vested in a central head, supreme office, or governing council whose decisions bind the wider church or movement. This concerns the location of governing authority, not whether that body claims to be the only true Church.",
    "episcopacy": "The Church is governed by colleges of bishops holding historic apostolic succession who oversee regional churches and convene in conciliar synods as equals under the headship of Christ alone.",
    "presbyterianism": "The Church is governed by graded, representative assemblies of ordained elders (presbyters) possessing equal ministerial rank, rejecting monarchical bishops while maintaining connectional authority.",
    "congregationalism": "Every local gathered congregation is autonomous and self-governing under Christ alone, rejecting binding external oversight from bishops, presbyteries, or centralized headquarters.",
    "non_clerical": "The Church possesses no ordained clergy, sacerdotal offices, or institutional governing apparatus, operating as an egalitarian spiritual fellowship led directly by the Holy Spirit without human hierarchy.",
    "amillennialism": "The 'thousand years' of Revelation represents Christ's present spiritual reign over the Church from heaven, culminating in a single bodily return at the end of the age for the general resurrection and final judgment without a future earthly political millennium.",
    "premillennialism": "Christ's future return precedes a literal millennial reign on earth. This value denotes an earthly millennium without the separate Israel–Church prophetic programs and two-stage return that define this test's Dispensationalism option. It differs from the Adventist Heavenly Millennium.",
    "dispensationalism": "God maintains distinct prophetic programs for Israel and the Church, with Christ returning in two stages: an initial secret pre-tribulation rapture of the Church, followed by an earthly millennium restoring national and Davidic promises to ethnic Israel.",
    "postmillennialism": "The Church will progressively Christianize world culture and civil governments through the proclamation of the Gospel, inaugurating a prolonged golden age of earthly righteousness and peace prior to Christ's bodily return.",
    "preterism": "Major biblical apocalyptic prophecies, including the Great Tribulation and the arrival of the Kingdom, were largely or entirely fulfilled in the first century through the destruction of Jerusalem in 70 AD and the close of the Old Covenant order.",
    "Confessional Anglican": "A confessional Anglican profile based on the Thirty-Nine Articles: the Trinity, two natures in one Christ, Scripture as the rule for necessary doctrine, justification by faith, spiritual reception in the Eucharist, and the episcopal order. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "United Methodist": "A United Methodist profile using its Articles of Religion and Wesleyan approach to Scripture, tradition, reason, and experience. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Southern Baptist": "Based on the Baptist Faith and Message: Christ is fully divine and human; Scripture governs faith; justification is gracious acquittal; baptism and the Supper are symbolic ordinances; local congregations are autonomous. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Assemblies of God": "A classical Pentecostal profile based on the Assemblies of God Statement of Fundamental Truths: the divine and human Christ, authoritative Scripture, water baptism and Communion as ordinances, and speaking in tongues as initial evidence of Spirit baptism. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Seventh-day Adventist": "An Adventist profile based on its Fundamental Beliefs and representative government: creedal Trinitarianism, the divine and human Christ, biblical authority, continuing spiritual gifts, fallen human nature, spiritual communion, grace and regeneration, connectional government, and a heavenly millennium. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Church of the Nazarene": "A Wesleyan-Holiness profile drawn from the Nazarene Articles of Faith. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Salvation Army": "A Wesleyan-Holiness profile based on the Salvation Army's eleven doctrines: Trinitarian faith, Christ's divine and human natures, biblical authority, justification by faith, and entire sanctification. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Quaker (unprogrammed)": "A focused profile of unprogrammed Friends, using British Quaker sources: direct guidance of the living Spirit, inward sacramental life rather than prescribed outward rites, and ministry open to all without a separate clergy. This does not assign all Friends a common Trinitarian or Christological position and does not represent every evangelical or programmed Quaker body.",
    "United Pentecostal Church International": "An Oneness Pentecostal profile based on the UPCI's own beliefs: one God revealed as Father, Son, and Holy Spirit; biblical authority; baptism in Jesus' name; and Spirit baptism with the initial sign of tongues. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Jehovah's Witnesses": "A Witness profile based on its own publications: Jehovah as the one Almighty God, Jesus identified with Michael, authorized biblical interpretation, the holy spirit as active force, inherited sin and corruption, dedication baptism and the Memorial, ransom and living faith, Governing Body direction, and heavenly Kingdom rule with earthly restoration. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Latter-day Saints": "A Latter-day Saint profile based on official Articles of Faith, Basic Doctrines, and the dedicated accounts of the Godhead and Fall. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Christian Science": "A Christian Science profile based on its religious tenets, foundational texts, and accounts of worship and healing: divine Mind and spiritual reality, spiritual Christ, Bible and Science and Health, Divine Science as Comforter, spiritual understanding of sin and salvation, non-ritual baptism and communion, lay ministry, and spiritual continuity beyond death. The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Eastern Orthodoxy": ". The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Oriental Orthodoxy": ". The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Roman Catholicism": ". The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Presbyterian": ". The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value.",
    "Confessional Lutheran": ". The profile below lists the positions assigned from the linked sources. Notes identify categories where a broad shared teaching does not justify a narrower scored value."
};

const denominationMapping = {
    "eastern_syriac_christology|sacramentalism|episcopacy|mystical_realism|conciliarism": "Assyrian Church of the East",
    "classical_trinitarianism|chalcedonian_dyophysitism|magisterialism|sacramentalism|wounded_nature|transubstantiation|infused_righteousness|centralism|amillennialism": "Roman Catholicism",
    "monarchical_trinitarianism|chalcedonian_dyophysitism|conciliarism|sacramentalism|ancestral_sin|mystical_realism|theosis|episcopacy|amillennialism": "Eastern Orthodoxy",
    "monarchical_trinitarianism|miaphysitism|conciliarism|sacramentalism|ancestral_sin|mystical_realism|theosis|episcopacy|amillennialism": "Oriental Orthodoxy",
    "classical_trinitarianism|chalcedonian_dyophysitism|sola_scriptura|cessationism|total_depravity|sacramental_union|forensic_justification|congregationalism|amillennialism": "Confessional Lutheran",
    "classical_trinitarianism|chalcedonian_dyophysitism|sola_scriptura|cessationism|total_depravity|pneumatic_presence|forensic_justification|presbyterianism|amillennialism": "Presbyterian",
    "classical_trinitarianism|chalcedonian_dyophysitism|sola_scriptura|pneumatic_presence|forensic_justification|episcopacy": "Confessional Anglican",
    "classical_trinitarianism|chalcedonian_dyophysitism|prima_scriptura|perfectionism|pneumatic_presence|forensic_justification": "United Methodist",
    "chalcedonian_dyophysitism|sola_scriptura|memorialism|forensic_justification|congregationalism": "Southern Baptist",
    "chalcedonian_dyophysitism|sola_scriptura|glossolalism|memorialism|forensic_justification": "Assemblies of God",
    "chalcedonian_dyophysitism|sola_scriptura|continuationism|pneumatic_presence": "Seventh-day Adventist",
    "classical_trinitarianism|chalcedonian_dyophysitism|sola_scriptura|perfectionism|pneumatic_presence|forensic_justification": "Church of the Nazarene",
    "classical_trinitarianism|chalcedonian_dyophysitism|sola_scriptura|perfectionism|forensic_justification|asacramentalism|centralism": "Salvation Army",
    "spiritualism|asacramentalism|non_clerical": "Quaker (unprogrammed)",
    "modalistic_monarchianism|sola_scriptura|glossolalism|baptismal_remission|covenantal_nomism|congregationalism": "United Pentecostal Church International",
    "unitarian_monotheism|angelomorphism|centralism|magisterialism|dynamism|memorialism|covenantal_nomism": "Jehovah's Witnesses",
    "continuing_revelation|continuationism|baptismal_remission|covenantal_nomism|tritheism|premillennialism|premortal_firstborn|necessary_fall|centralism": "Latter-day Saints",
    "monistic_idealism|spiritual_idealism|asacramentalism|non_clerical": "Christian Science"
};

const denominationFamilies = {
    "Apostolic": [
        "Roman Catholicism",
        "Eastern Orthodoxy",
        "Oriental Orthodoxy",
        "Assyrian Church of the East"
    ],
    "Protestant": [
        "Confessional Lutheran",
        "Presbyterian"
    ],
    "Anglican": [
        "Confessional Anglican"
    ],
    "Wesleyan and Holiness": [
        "United Methodist",
        "Church of the Nazarene",
        "Salvation Army"
    ],
    "Neoprotestant": [
        "Southern Baptist",
        "Assemblies of God",
        "Seventh-day Adventist",
        "United Pentecostal Church International"
    ],
    "Friends": [
        "Quaker (unprogrammed)"
    ],
    "Restorationist and Non-Trinitarian": [
        "Jehovah's Witnesses",
        "Latter-day Saints",
        "Christian Science"
    ]
};

const denominationSupplementaryValues = {
    "Eastern Orthodoxy": {
        "palamite_panentheism": 1
    }
};

const denominationComposites = {
    "Eastern Orthodox/Oriental Orthodox": [
        "Eastern Orthodoxy",
        "Oriental Orthodoxy"
    ]
};

const denominationColors = {
    "Assyrian Church of the East": "#7b4b30",
    "Eastern Orthodox/Oriental Orthodox": "#5c4c75",
    "No exact match": "#5C5C5C",
    "Roman Catholicism": "#E5A93C",
    "Eastern Orthodoxy": "#2E5B88",
    "Oriental Orthodoxy": "#8B2635",
    "Confessional Lutheran": "#3B7A57",
    "Presbyterian": "#4A6B82",
    "Confessional Anglican": "#655386",
    "United Methodist": "#99642b",
    "Southern Baptist": "#426843",
    "Assemblies of God": "#8b433e",
    "Seventh-day Adventist": "#447977",
    "Church of the Nazarene": "#846b37",
    "Salvation Army": "#9a3947",
    "Quaker (unprogrammed)": "#5b7753",
    "United Pentecostal Church International": "#755179",
    "Jehovah's Witnesses": "#3b7092",
    "Latter-day Saints": "#56698c",
    "Christian Science": "#806a8a"
};

const descriptionSources = {
    "moral_influence": [
        {
            "title": "Oliver D. Crisp: Moral Exemplarism and Atonement",
            "url": "https://www.cambridge.org/core/journals/scottish-journal-of-theology/article/moral-exemplarism-and-atonement/8B06846B5045D86EEFFDDA19F72762C8"
        }
    ],
    "palamite_panentheism": [
        {
            "title": "OCA: Saint Gregory Palamas — Essence and Energies",
            "url": "https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/fourteenth-century/saint-gregory-palamas"
        },
        {
            "title": "Orthodox Fellowship of the Transfiguration: God's Sustaining Energy and Essence",
            "url": "https://www.orth-transfiguration.org/resources/library/writings-of-the-saints/st-gregory-palamas-1296-1359/"
        }
    ],
    "monarchical_trinitarianism": [
        {
            "title": "OCA: One God, One Father",
            "url": "https://www.oca.org/orthodoxy/the-orthodox-faith/doctrine-scripture/the-holy-trinity/one-god-one-father"
        }
    ],
    "eastern_syriac_christology": [
        {
            "title": "Catholic–Assyrian Common Christological Declaration (1994)",
            "url": "https://www.vatican.va/content/john-paul-ii/en/speeches/1994/november/documents/hf_jp-ii_spe_19941111_dichiarazione-cristologica.html"
        }
    ],
    "Assyrian Church of the East": [
        {
            "title": "Assyrian Church: Organisation and Worship",
            "url": "https://www.assyrianchurch.org.au/the-church"
        },
        {
            "title": "Catholic–Assyrian Declaration: Incarnation and Sacraments (1994)",
            "url": "https://www.vatican.va/content/john-paul-ii/en/speeches/1994/november/documents/hf_jp-ii_spe_19941111_dichiarazione-cristologica.html"
        }
    ],
    "Confessional Anglican": [
        {
            "title": "Church of England: Articles I–VI, XI, XXVIII and XXXVI",
            "url": "https://www.churchofengland.org/liturgy/book-of-common-prayer/articles-religion"
        }
    ],
    "United Methodist": [
        {
            "title": "UMC: Articles I–II, IX and XVIII; appended sanctification statement",
            "url": "https://www.umc.org/en/content/articles-of-religion"
        },
        {
            "title": "UMC: Wesleyan Quadrilateral",
            "url": "https://www.umc.org/en/content/glossary-wesleyan-quadrilateral-the"
        }
    ],
    "Southern Baptist": [
        {
            "title": "SBC: Baptist Faith and Message, Articles I, II.B, IV, VI and VII",
            "url": "https://bfm.sbc.net/bfm2000/"
        }
    ],
    "Assemblies of God": [
        {
            "title": "Assemblies of God: Fundamental Truths 1, 3, 6, 7 and 8",
            "url": "https://ag.org/beliefs/statement-of-fundamental-truths"
        },
        {
            "title": "Local Structure and Government",
            "url": "https://ag.org/about/about-the-ag/structure"
        }
    ],
    "Seventh-day Adventist": [
        {
            "title": "Seventh-day Adventist Church: Fundamental Beliefs 1, 4, 17–18, 20 and 27",
            "url": "https://adventist.org/beliefs"
        },
        {
            "title": "Adventist Representative Government",
            "url": "https://gc.adventist.org/wp-content/uploads/2025/03/GC-Health-Ministries-GCLDP-Conference-Presentation-Outline-03-06-2025.pdf"
        }
    ],
    "Church of the Nazarene": [
        {
            "title": "Church of the Nazarene: Articles I–IV, IX–X and XIII",
            "url": "https://nazarene.org/what-we-believe/"
        },
        {
            "title": "Nazarene General Board",
            "url": "https://nazarene.org/general-board/"
        }
    ],
    "Salvation Army": [
        {
            "title": "Salvation Army: Eleven Doctrines 1, 3, 4, 8 and 10",
            "url": "https://www.salvationarmy.org/what-we-believe"
        },
        {
            "title": "Salvation Army: Statements on Baptism and Holy Communion",
            "url": "https://www.salvationarmy.org/india/Faith_Belief"
        },
        {
            "title": "Salvation Army: Leadership Glossary",
            "url": "https://www.salvationarmy.org/glossary-terms"
        }
    ],
    "Quaker (unprogrammed)": [
        {
            "title": "Quakers in Britain: Sources of Authority and Ecumenical Agenda",
            "url": "https://www.quaker.org.uk/documents/quakers-and-the-ecumenical-agenda-2009"
        },
        {
            "title": "Quakers in Britain: How Quakers Worship",
            "url": "https://www.quaker.org.uk/faith/our-faith/how-quakers-worship"
        },
        {
            "title": "Quakers in Britain: Diversity of Faith",
            "url": "https://www.quaker.org.uk/faith/read-about-quaker-faith"
        }
    ],
    "United Pentecostal Church International": [
        {
            "title": "UPCI: Our Beliefs, Bible, God and Gospel",
            "url": "https://upci.org/our-beliefs/"
        },
        {
            "title": "UPCI: Local Government",
            "url": "https://upci.org/about-the-upci/"
        }
    ],
    "Jehovah's Witnesses": [
        {
            "title": "JW.org: What Jehovah's Witnesses Believe",
            "url": "https://www.jw.org/en/jehovahs-witnesses/faq/jehovah-witness-beliefs/"
        },
        {
            "title": "JW.org: Who Is the Archangel Michael?",
            "url": "https://www.jw.org/en/bible-teachings/questions/archangel-michael/"
        },
        {
            "title": "JW.org: Original Sin",
            "url": "https://www.jw.org/en/bible-teachings/questions/original-sin/"
        },
        {
            "title": "JW.org: Holy Spirit",
            "url": "https://www.jw.org/en/bible-teachings/questions/what-is-the-holy-spirit/"
        },
        {
            "title": "JW.org: Meaning of Baptism",
            "url": "https://www.jw.org/en/bible-teachings/questions/what-is-baptism/"
        },
        {
            "title": "JW.org: Why We Attend the Memorial",
            "url": "https://wol.jw.org/en/wol/d/r1/lp-e/2022245"
        }
    ],
    "Latter-day Saints": [
        {
            "title": "The Church of Jesus Christ of Latter-day Saints: Articles of Faith 3–9",
            "url": "https://www.churchofjesuschrist.org/comeuntochrist/article/articles-of-faith"
        },
        {
            "title": "Latter-day Saints: Basic Doctrines",
            "url": "https://www.churchofjesuschrist.org/study/manual/basic-doctrines/basic-doctrines?lang=eng"
        }
    ],
    "Christian Science": [
        {
            "title": "Christian Science: Religious Tenets 2–5",
            "url": "https://www.christianscience.com/what-we-believe/what-a-christian-scientist-believes"
        },
        {
            "title": "Christian Science: Belief and Worship FAQ",
            "url": "https://www.christianscience.com/what-we-believe/frequently-asked-questions"
        }
    ],
    "premortal_firstborn": [
        {
            "title": "Latter-day Saints: Basic Doctrines, Jesus Christ",
            "url": "https://www.churchofjesuschrist.org/study/manual/basic-doctrines/basic-doctrines?lang=eng"
        }
    ],
    "necessary_fall": [
        {
            "title": "Latter-day Saints: Fall of Adam and Eve",
            "url": "https://www.churchofjesuschrist.org/study/manual/gospel-topics/fall-of-adam-and-eve?lang=eng"
        }
    ],
    "tritheism": [
        {
            "title": "Source for this value",
            "url": "https://www.churchofjesuschrist.org/study/manual/gospel-topics/godhead?lang=eng"
        }
    ],
    "magisterialism": [
        {
            "title": "Source for this value",
            "url": "https://www.jw.org/en/jehovahs-witnesses/faq/jehovah-witness-beliefs/"
        }
    ],
    "conciliarism": [
        {
            "title": "Teaching and terminology source",
            "url": "https://www.vatican.va/content/john-paul-ii/en/speeches/1994/november/documents/hf_jp-ii_spe_19941111_dichiarazione-cristologica.html"
        }
    ],
    "asacramentalism": [
        {
            "title": "Source for this value",
            "url": "https://www.salvationarmy.org/india/Faith_Belief"
        }
    ],
    "mystical_realism": [
        {
            "title": "Source for this value",
            "url": "https://www.assyrianchurch.org.au/the-church"
        }
    ],
    "pneumatic_presence": [
        {
            "title": "Teaching and terminology source",
            "url": "https://adventist.org/beliefs"
        }
    ],
    "memorialism": [
        {
            "title": "Teaching and terminology source",
            "url": "https://www.jw.org/en/jehovahs-witnesses/faq/jehovah-witness-beliefs/"
        },
        {
            "title": "JW.org: Meaning of Baptism",
            "url": "https://www.jw.org/en/bible-teachings/questions/what-is-baptism/"
        },
        {
            "title": "JW.org: Why We Attend the Memorial",
            "url": "https://wol.jw.org/en/wol/d/r1/lp-e/2022245"
        }
    ],
    "covenantal_nomism": [
        {
            "title": "Teaching and terminology source",
            "url": "https://www.jw.org/en/jehovahs-witnesses/faq/jehovah-witness-beliefs/"
        }
    ],
    "centralism": [
        {
            "title": "Teaching and terminology source",
            "url": "https://www.salvationarmy.org/glossary-terms"
        },
        {
            "title": "Teaching and terminology source",
            "url": "https://www.churchofjesuschrist.org/study/manual/basic-doctrines/basic-doctrines?lang=eng"
        }
    ],
    "premillennialism": [
        {
            "title": "Source for this value",
            "url": "https://www.churchofjesuschrist.org/comeuntochrist/article/articles-of-faith"
        }
    ]
};

const iconSources = {
    "palamite_panentheism": "",
    "eastern_syriac_christology": "",
    "classical_trinitarianism": "",
    "monarchical_trinitarianism": "",
    "social_trinitarianism": "",
    "unitarian_monotheism": "",
    "modalistic_monarchianism": "",
    "binitarianism": "",
    "tritheism": "",
    "process_panentheism": "",
    "monistic_idealism": "",
    "chalcedonian_dyophysitism": "",
    "miaphysitism": "",
    "nestorianism": "",
    "monophysitism": "",
    "celestial_flesh": "",
    "subordinationism": "",
    "arianism": "",
    "angelomorphism": "",
    "premortal_firstborn": "",
    "socinianism": "",
    "adoptionism": "",
    "docetism": "",
    "magisterialism": "",
    "conciliarism": "",
    "prima_scriptura": "",
    "sola_scriptura": "",
    "nuda_scriptura": "",
    "continuing_revelation": "",
    "spiritualism": "",
    "neo_orthodoxy": "",
    "modernism": "",
    "glossolalism": "",
    "continuationism": "",
    "cessationism": "",
    "perfectionism": "",
    "sacramentalism": "",
    "dynamism": "",
    "immanentism": "",
    "total_depravity": "",
    "wounded_nature": "",
    "ancestral_sin": "",
    "pelagianism": "",
    "necessary_fall": "",
    "naturalism": "",
    "spiritual_idealism": "",
    "transubstantiation": "",
    "mystical_realism": "",
    "sacramental_union": "",
    "pneumatic_presence": "",
    "baptismal_remission": "",
    "memorialism": "",
    "asacramentalism": "",
    "forensic_justification": "",
    "infused_righteousness": "",
    "theosis": "",
    "covenantal_nomism": "",
    "moral_influence": "",
    "centralism": "",
    "episcopacy": "",
    "presbyterianism": "",
    "congregationalism": "",
    "non_clerical": "",
    "amillennialism": "",
    "premillennialism": "",
    "dispensationalism": "",
    "postmillennialism": "",
    "preterism": ""
};

const subCategories = {
    "theology_proper": {
        "essence_energies": [
            "palamite_panentheism"
        ],
        "trinitarian": [
            "classical_trinitarianism",
            "monarchical_trinitarianism",
            "social_trinitarianism"
        ],
        "monarchian": [
            "unitarian_monotheism",
            "modalistic_monarchianism"
        ],
        "plural_dual": [
            "binitarianism",
            "tritheism"
        ],
        "idealist_process": [
            "process_panentheism",
            "monistic_idealism"
        ]
    },
    "christology": {
        "incarnation_orthodox": [
            "chalcedonian_dyophysitism",
            "miaphysitism",
            "eastern_syriac_christology",
            "nestorianism"
        ],
        "spiritual_flesh": [
            "monophysitism",
            "celestial_flesh",
            "docetism"
        ],
        "subordinate_pre_existent": [
            "subordinationism",
            "arianism",
            "angelomorphism",
            "premortal_firstborn"
        ],
        "mortal_human": [
            "socinianism",
            "adoptionism"
        ]
    },
    "bibliology": {
        "tradition_magisterium": [
            "magisterialism",
            "conciliarism",
            "prima_scriptura"
        ],
        "scripture_alone": [
            "sola_scriptura",
            "nuda_scriptura"
        ],
        "pneumatic_prophetic": [
            "continuing_revelation",
            "spiritualism"
        ],
        "modernist_dynamic": [
            "neo_orthodoxy",
            "modernism"
        ]
    },
    "pneumatology": {
        "charismatic_experiential": [
            "glossolalism",
            "continuationism",
            "perfectionism"
        ],
        "normative_order": [
            "cessationism",
            "sacramentalism"
        ],
        "nontraditional_spirit": [
            "dynamism",
            "immanentism"
        ]
    },
    "hamartiology": {
        "classical_fall": [
            "total_depravity",
            "wounded_nature",
            "ancestral_sin"
        ],
        "minimal_fall": [
            "pelagianism",
            "necessary_fall"
        ],
        "non_fall": [
            "naturalism",
            "spiritual_idealism"
        ]
    },
    "sacramentology": {
        "real_presence": [
            "transubstantiation",
            "mystical_realism",
            "sacramental_union"
        ],
        "spiritual_covenant": [
            "pneumatic_presence"
        ],
        "ordinance_believer": [
            "baptismal_remission",
            "memorialism"
        ],
        "inward_only": [
            "asacramentalism"
        ]
    },
    "soteriology": {
        "forensic_imputation": [
            "forensic_justification"
        ],
        "transformative_union": [
            "infused_righteousness",
            "theosis"
        ],
        "covenant_fidelity": [
            "covenantal_nomism"
        ],
        "moral_exemplar": [
            "moral_influence"
        ]
    },
    "ecclesiology": {
        "hierarchical_oversight": [
            "centralism",
            "episcopacy"
        ],
        "deliberative_local": [
            "presbyterianism",
            "congregationalism"
        ],
        "non_hierarchical": [
            "non_clerical"
        ]
    },
    "eschatology": {
        "premillennial_kingdom": [
            "premillennialism",
            "dispensationalism"
        ],
        "present_or_post_kingdom": [
            "amillennialism",
            "postmillennialism"
        ],
        "fulfilled_kingdom": [
            "preterism"
        ]
    }
};

const incompatibleSubCategories = {
    "trinitarian": [
        "monarchian",
        "plural_dual",
        "idealist_process"
    ],
    "monarchian": [
        "trinitarian",
        "plural_dual"
    ],
    "plural_dual": [
        "trinitarian",
        "monarchian",
        "idealist_process"
    ],
    "idealist_process": [
        "trinitarian",
        "plural_dual"
    ],
    "incarnation_orthodox": [
        "subordinate_pre_existent",
        "mortal_human"
    ],
    "spiritual_flesh": [
        "subordinate_pre_existent",
        "mortal_human"
    ],
    "subordinate_pre_existent": [
        "incarnation_orthodox",
        "spiritual_flesh",
        "mortal_human"
    ],
    "mortal_human": [
        "incarnation_orthodox",
        "spiritual_flesh",
        "subordinate_pre_existent"
    ],
    "tradition_magisterium": [
        "scripture_alone",
        "pneumatic_prophetic",
        "modernist_dynamic"
    ],
    "scripture_alone": [
        "tradition_magisterium",
        "pneumatic_prophetic",
        "modernist_dynamic"
    ],
    "pneumatic_prophetic": [
        "tradition_magisterium",
        "scripture_alone",
        "modernist_dynamic"
    ],
    "modernist_dynamic": [
        "tradition_magisterium",
        "scripture_alone",
        "pneumatic_prophetic"
    ],
    "charismatic_experiential": [
        "nontraditional_spirit"
    ],
    "normative_order": [
        "nontraditional_spirit"
    ],
    "nontraditional_spirit": [
        "charismatic_experiential",
        "normative_order"
    ],
    "classical_fall": [
        "minimal_fall",
        "non_fall"
    ],
    "minimal_fall": [
        "classical_fall",
        "non_fall"
    ],
    "non_fall": [
        "classical_fall",
        "minimal_fall"
    ],
    "real_presence": [
        "ordinance_believer",
        "inward_only"
    ],
    "spiritual_covenant": [
        "inward_only"
    ],
    "ordinance_believer": [
        "real_presence",
        "inward_only"
    ],
    "inward_only": [
        "real_presence",
        "spiritual_covenant",
        "ordinance_believer"
    ],
    "forensic_imputation": [
        "transformative_union",
        "covenant_fidelity",
        "moral_exemplar"
    ],
    "transformative_union": [
        "forensic_imputation",
        "covenant_fidelity",
        "moral_exemplar"
    ],
    "covenant_fidelity": [
        "forensic_imputation",
        "transformative_union",
        "moral_exemplar"
    ],
    "moral_exemplar": [
        "forensic_imputation",
        "transformative_union",
        "covenant_fidelity"
    ],
    "hierarchical_oversight": [
        "deliberative_local",
        "non_hierarchical"
    ],
    "deliberative_local": [
        "hierarchical_oversight",
        "non_hierarchical"
    ],
    "non_hierarchical": [
        "hierarchical_oversight",
        "deliberative_local"
    ],
    "premillennial_kingdom": [
        "present_or_post_kingdom",
        "fulfilled_kingdom"
    ],
    "present_or_post_kingdom": [
        "premillennial_kingdom",
        "fulfilled_kingdom"
    ],
    "fulfilled_kingdom": [
        "premillennial_kingdom",
        "present_or_post_kingdom"
    ]
};

const denominationCategoryNotes = {
    "Quaker (unprogrammed)": {
        "theology_proper": "Unprogrammed British Friends do not impose one creed in this category; Christian, other religious, and non-theistic understandings coexist.",
        "christology": "Unprogrammed British Friends do not impose one creed in this category; Christian, other religious, and non-theistic understandings coexist.",
        "pneumatology": "Unprogrammed British Friends do not impose one creed in this category; Christian, other religious, and non-theistic understandings coexist.",
        "hamartiology": "Unprogrammed British Friends do not impose one creed in this category; Christian, other religious, and non-theistic understandings coexist.",
        "soteriology": "Unprogrammed British Friends do not impose one creed in this category; Christian, other religious, and non-theistic understandings coexist.",
        "eschatology": "Unprogrammed British Friends do not impose one creed in this category; Christian, other religious, and non-theistic understandings coexist."
    },
    "Assyrian Church of the East": {
        "theology_proper": "Confesses the Trinity. The inspected statement does not uniquely select one of this test's more specific Trinitarian models.",
        "soteriology": "Affirms grace, forgiveness, and new life. This shared affirmation does not uniquely identify one of the listed models of salvation.",
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "hamartiology": "Affirms the universal need for redemption, without specifying the account of inherited guilt or corruption used by the listed values."
    },
    "Confessional Anglican": {
        "hamartiology": "Affirms a fallen human condition. A more specific assignment concerning inherited guilt, free will, and regeneration is not made from this general statement.",
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "pneumatology": "Confesses the personal, divine Holy Spirit without prescribing one of the listed positions on sign gifts or the defining mode of the Spirit's work."
    },
    "United Methodist": {
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "hamartiology": "Human nature is fallen and cannot turn to God by unaided strength. God's preceding grace enables a response of faith; this enabling grace is not restricted to those already regenerated.",
        "ecclesiology": "Authority is exercised through representative conferences or assemblies involving both clergy and lay delegates, with local churches bound into a wider connection. This differs from government exclusively by ordained presbyteries, government grounded in historic apostolic episcopacy, independent congregational sovereignty, and a single supreme governing office."
    },
    "Southern Baptist": {
        "theology_proper": "Confesses the Trinity. The inspected statement does not uniquely select one of this test's more specific Trinitarian models.",
        "hamartiology": "Affirms a fallen human condition. A more specific assignment concerning inherited guilt, free will, and regeneration is not made from this general statement.",
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "pneumatology": "Confesses the personal, divine Holy Spirit without prescribing one of the listed positions on sign gifts or the defining mode of the Spirit's work."
    },
    "Assemblies of God": {
        "theology_proper": "Confesses the Trinity. The inspected statement does not uniquely select one of this test's more specific Trinitarian models.",
        "hamartiology": "Affirms a fallen human condition. A more specific assignment concerning inherited guilt, free will, and regeneration is not made from this general statement.",
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "ecclesiology": "Authority is exercised through representative conferences or assemblies involving both clergy and lay delegates, with local churches bound into a wider connection. This differs from government exclusively by ordained presbyteries, government grounded in historic apostolic episcopacy, independent congregational sovereignty, and a single supreme governing office."
    },
    "Seventh-day Adventist": {
        "theology_proper": "Confesses the Trinity. The inspected statement does not uniquely select one of this test's more specific Trinitarian models.",
        "hamartiology": "Affirms a fallen human condition. A more specific assignment concerning inherited guilt, free will, and regeneration is not made from this general statement.",
        "soteriology": "Affirms grace, forgiveness, and new life. This shared affirmation does not uniquely identify one of the listed models of salvation.",
        "eschatology": "Christ reigns with His saints in heaven for a thousand years between the first and second resurrections. The earth is desolate during this period; final judgment and renewal follow.",
        "ecclesiology": "Authority is exercised through representative conferences or assemblies involving both clergy and lay delegates, with local churches bound into a wider connection. This differs from government exclusively by ordained presbyteries, government grounded in historic apostolic episcopacy, independent congregational sovereignty, and a single supreme governing office."
    },
    "Church of the Nazarene": {
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "hamartiology": "Human nature is fallen and cannot turn to God by unaided strength. God's preceding grace enables a response of faith; this enabling grace is not restricted to those already regenerated.",
        "ecclesiology": "Authority is exercised through representative conferences or assemblies involving both clergy and lay delegates, with local churches bound into a wider connection. This differs from government exclusively by ordained presbyteries, government grounded in historic apostolic episcopacy, independent congregational sovereignty, and a single supreme governing office."
    },
    "Salvation Army": {
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "hamartiology": "Human nature is fallen and cannot turn to God by unaided strength. God's preceding grace enables a response of faith; this enabling grace is not restricted to those already regenerated."
    },
    "United Pentecostal Church International": {
        "eschatology": "Affirms future return, resurrection, and judgment without one required millennial chronology.",
        "hamartiology": "Affirms the universal need for redemption, without specifying the account of inherited guilt or corruption used by the listed values.",
        "christology": "Jesus Christ is the one God manifested in flesh, truly divine and truly human, within a Oneness account of Father, Son, and Holy Spirit."
    },
    "Jehovah's Witnesses": {
        "hamartiology": "Affirms a fallen human condition. A more specific assignment concerning inherited guilt, free will, and regeneration is not made from this general statement.",
        "eschatology": "God's heavenly Kingdom under Christ replaces human rule and restores life on earth. In the Witness account, Christ's heavenly kingship began in 1914."
    },
    "Christian Science": {
        "christology": "Affirms the divinity of the Christ while distinguishing Jesus from God. In Christian Science, Jesus demonstrates divine Truth and Life through healing and victory over sin and death. This value does not deny the crucifixion or resurrection.",
        "bibliology": "Reads the Bible together with Mary Baker Eddy's Science and Health with Key to the Scriptures as the foundational texts of Christian Science.",
        "soteriology": "Salvation involves recognizing unity with God through Christ, overcoming sin and its effects through spiritual understanding and the practice of divine Truth and Love.",
        "eschatology": "Life continues beyond death as spiritual growth and understanding continue. This value expresses the Christian Science account without assigning a physical millennial timetable.",
        "pneumatology": "The Holy Ghost is understood in Christian Science as the unfolding of eternal divine Life, Truth, and Love, illuminating and enabling spiritual healing."
    }
};

const valueAliases = {
    "creedal_trinitarianism": null,
    "godhead_unity_purpose": "tritheism",
    "authorized_biblical_interpretation": "magisterialism",
    "scripture_apostolic_tradition": "conciliarism",
    "personal_divine_spirit": null,
    "inherited_corruption": null,
    "universal_need_redemption": null,
    "non_ritual_sacramentality": "asacramentalism",
    "eucharistic_realism": "mystical_realism",
    "spiritual_communion": "pneumatic_presence",
    "dedication_and_memorial": "memorialism",
    "grace_and_regeneration": null,
    "ransom_living_faith": "covenantal_nomism",
    "centralized_ministry": "centralism",
    "restored_apostolic_government": "centralism",
    "restorationist_millennium": "premillennialism",
    "return_resurrection_judgment": null,
    "divine_human_oneness": null,
    "spiritual_christ": null,
    "bible_science_health": null,
    "divine_science": null,
    "prevenient_grace": null,
    "spiritual_salvation": null,
    "connectionalism": null,
    "heavenly_millennium": null,
    "spiritual_continuity": null,
    "kingdom_earthly_restoration": null
};
