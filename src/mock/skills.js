import Immutable from 'immutable';

const CommitInfo = Immutable.Record({ first: undefined, last: undefined, count: undefined });
const Skill = Immutable.Record({ name: undefined, rank: 0.0, impact: 1, childSkills: Immutable.List(), commits: new CommitInfo() });

const SKILLS = new Skill({
  name: 'Languages',
  rank: 0.84,
  childSkills: Immutable.List([
    new Skill({
      name: 'JavaScript',
      rank: 0.72222222222,
      impact: 181739,
      childSkills: Immutable.List([
        new Skill({ name: '__language__',
          rank: 0.16,
          impact: 72000,
          childSkills: Immutable.List([
            new Skill({ name: '__standard_library__', rank: 0.6666666666666, }),
            new Skill({ name: '__grammar__', rank: 0.65, }),
          ])
        }),
        new Skill({ name: 'underscore', rank: 0.82, impact: 13032 }),
        new Skill({ name: 'redux-devtools', rank: 0.91, impact: 8321 }),
        new Skill({ name: 'lodash', rank: .70, impact: 7810 }),
        new Skill({ name: 'rc-tooltip', rank: .80, impact: 313 }),
        new Skill({ name: 'rc-slider', rank: .40, impact: 413 }),
        new Skill({ name: 'redux-logger', rank: 0.85, impact: 1523 }),
        new Skill({ name: 'react-redux', rank: 0.72, impact: 2921 }),
        new Skill({ name: 'redux-devtools-log-monitor', rank: 0.56, impact: 810 }),
        new Skill({ name: 'redux', rank: 0.91, impact: 54432 }),
        new Skill({ name: 'react-addons-css-transition-group', rank: 1.0, impact: 1800 }),
        new Skill({ name: 'react-dom', rank: 0.85, impact: 11381 }),
        new Skill({ name: 'highlight', rank: 0.76, impact: 819 }),
        new Skill({ name: 'marked', rank: 0.94, impact: 759 }),
        new Skill({ name: 'react-slider', rank: 0.75, impact: 3193 }),
        new Skill({ name: 'redux-thunk', rank: 1.0, impact: 7810 }),
        new Skill({ name: 'crypto', rank: 0.6, impact: 86 }),
        new Skill({ name: 'immutable', rank: 0.5, impact: 18471 }),
        new Skill({ name: 'd3', rank: 0.97, impact: 41937 }),
        new Skill({ name: 'isomorphic-fetch', rank: 1.0, impact: 6193 }),
        new Skill({ name: 'keymirror', rank: 1.0, impcat: 9567 }),
        new Skill({ name: 'redux-devtools-dock-monitor', rank: 1.0, impact: 8109 }),
        new Skill({ name: 'react', rank: 0.75, impact: 67103 }),
      ])
    }),
    new Skill({
      name: 'Python', 
      rank: 0.34782608695652173,
      impact: 121739,
      childSkills: new Immutable.List([
        new Skill({ name: '__language__',
          rank: 0.6363636363636363636,
          childSkills: Immutable.List([
            new Skill({ name: '__standard_library__', rank: 0.5909090909090909, }),
            new Skill({ name: '__grammar__', rank: 0.7, }),
          ])
        }),
        new Skill({ name: 'passlib', rank: 1.0, impact: 8571}),
        new Skill({ name: 'shell', rank: 0.92, impact: 1932 }),
        new Skill({ name: 'requests', rank: 0.9090909090909090909, impact: 37193 }),
        new Skill({ name: 'flask_debugtoolbar', rank: 0.85, impact: 871 }),
        new Skill({ name: 'stripe', rank: 0.56, impact: 17571 }),
        new Skill({ name: 'tornado', rank: 1.0, impact: 9729 }),
        new Skill({ name: 'datomic', rank: 1.0, impact: 2938 }),
        new Skill({ name: 'magic', rank: 1.0, impact: 989 }),
        new Skill({ name: 'marshmallow', rank: 0.5, impact: 16729 }),
        new Skill({ name: 'flask', rank: 0.8333333333333, impact: 17819 }),
        new Skill({ name: 'werkzeug', rank: 0.5, impact: 12839 }),
        new Skill({ name: 'sqlalchemy', rank: 0.8333333333333, impact: 14871 }),
      ])
    }),
    new Skill({
      name: 'C++', 
      rank: 0.21,
      impact: 221739,
      childSkills: new Immutable.List([
        new Skill({ name: '__language__',
          rank: 0.11,
          childSkills: Immutable.List([
            new Skill({ name: '__standard_library__', rank: 0.2, }),
            new Skill({ name: '__grammar__', rank: 0.07, }),
          ])
        }),
        new Skill({ name: 'boost', rank: 1.0, impact: 73284 }),
        new Skill({ name: 'clang', rank: 0.92, impact: 13293 }),
        new Skill({ name: 'foo', rank: 0.45, impact: 8592 }),
        new Skill({ name: 'bar', rank: 0.82, impact: 5592 }),
        new Skill({ name: 'baz', rank: 0.73, impact: 4829 }),
        new Skill({ name: 'qux', rank: 0.21, impact: 1931 }),
        new Skill({ name: 'quuz', rank: 0.48, impact: 2313 }),
      ])
    })
  ]),
});

export default SKILLS;
