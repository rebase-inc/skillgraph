import Immutable from 'immutable';

const LanguageSkill = Immutable.Record({ name: '', skill: 0, technologies: Immutable.Map() });
const SKILLS = Immutable.Map({
  python: new LanguageSkill({ name: 'Python', skill: .70, technologies: Immutable.Map({
    standardLibrary: 80,
    sqlAlchemy: 40,
    flask: 40,
    numpy: 30,
    scipy: 28,
    matplotlib: 14,
    pandas: 12 })
  }),
  javascript: new LanguageSkill({ name: 'JavaScript', skill: .55, technologies: Immutable.Map({
    standardLibrary: 85,
    react: 70,
    immutable: 44,
    d3: 30,
    lodash: 18,
    jquery: 12,
    ace: 7,
    typescript: 5 })
  }),
  cpp: new LanguageSkill({ name: 'C++', skill: .43, technologies: Immutable.Map({
    standardLibrary: 46,
    boost: 44,
    loci: 33,
    stl: 21,
    libgit2: 12,
    ace: 8 })
  }),
  go: new LanguageSkill({ name: 'Go', skill: .32, technologies: Immutable.Map({
    standardLibrary: 30,
    httpauth: 50,
    binpacker: 42,
    celeriac: 9,
    decimal: 7,
    walk: 3 })
  }),
  css: new LanguageSkill({ name: 'CSS', skill: .16, technologies: Immutable.Map({
    standardLibrary: 24,
    scss: 18,
    less: 14 })
  }),
  html: new LanguageSkill({ name: 'HTML', skill: .12, technologies: Immutable.Map({
    standardLibrary: 18,
    video: 12,
    file: 9 })
  })
});

export default SKILLS;
