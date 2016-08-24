import Immutable from 'immutable';

const TechSkill = Immutable.Record({ name: '', percentile: 0.0, technologies: Immutable.List(), commits: Immutable.List() });
const SKILLS = Immutable.List([
  TechSkill({
    name: 'Python',
    percentile: .70,
    technologies: Immutable.List([
      TechSkill({ name: 'Standard Library', percentile: .80 }),
      TechSkill({ name: 'SQLAlchemy', percentile: 0.40 }),
      TechSkill({ name: 'Flask', percentile: 0.40 }),
      TechSkill({ name: 'NumPy', percentile: 0.30 }),
      TechSkill({ name: 'SciPy', percentile: 0.28 }),
      TechSkill({ name: 'matplotlib', percentile: 0.14 }),
      TechSkill({ name: 'pandas', percentile: 0.12 }),
    ])
  }),
  TechSkill({
    name: 'JavaScript',
    percentile: .55,
    technologies: Immutable.List([
      TechSkill({ name: 'Standard Library', percentile: .75 }),
      TechSkill({ name: 'React', percentile: 0.70 }),
      TechSkill({ name: 'ImmutableJS', percentile: 0.44 }),
      TechSkill({ name: 'd3js', percentile: 0.30 }),
      TechSkill({ name: 'lodash', percentile: 0.18 }),
      TechSkill({ name: 'jQuery', percentile: 0.12 }),
      TechSkill({ name: 'TypeScript', percentile: 0.07 }),
    ])
  }),
  TechSkill({
    name: 'C++',
    percentile: .43,
    technologies: Immutable.List([
      TechSkill({ name: 'Standard Library', percentile: .46 }),
      TechSkill({ name: 'Boost', percentile: 0.44 }),
      TechSkill({ name: 'Loci', percentile: 0.33 }),
      TechSkill({ name: 'STL', percentile: 0.21 }),
      TechSkill({ name: 'libgit2', percentile: 0.12 }),
      TechSkill({ name: 'ACE', percentile: 0.08 }),
    ])
  }),
  TechSkill({
    name: 'Go',
    percentile: .32,
    technologies: Immutable.List([
      TechSkill({ name: 'Standard Library', percentile: .30 }),
      TechSkill({ name: 'httpauth', percentile: 0.50 }),
      TechSkill({ name: 'binpacker', percentile: 0.42 }),
      TechSkill({ name: 'celeriac', percentile: 0.9 }),
      TechSkill({ name: 'decimal', percentile: 0.07 }),
      TechSkill({ name: 'walk', percentile: 0.06 }),
    ])
  }),
  TechSkill({
    name: 'CSS',
    percentile: .16,
    technologies: Immutable.List([
      TechSkill({ name: 'Standard Library', percentile: .24 }),
      TechSkill({ name: 'SCSS', percentile: 0.18 }),
      TechSkill({ name: 'LESS', percentile: 0.14 }),
    ])
  }),
  TechSkill({
    name: 'HTML',
    percentile: .16,
    technologies: Immutable.List([
      TechSkill({ name: 'VideoAPI', percentile: 0.18 }),
      TechSkill({ name: 'FileAPI', percentile: 0.11 }),
    ])
  }),
]);

export default SKILLS;
