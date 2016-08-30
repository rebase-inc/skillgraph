import Immutable from 'immutable';

const TechSkill = Immutable.Record({ name: '', percentile: 0.0, technologies: Immutable.List(), commits: Immutable.List() });
const SKILLS = new TechSkill({
  name: 'Languages',
  percentile: 0.90,
  commits: Immutable.List(),
  technologies: Immutable.List([
    new TechSkill({
      name: 'Python',
      percentile: .70,
      technologies: Immutable.List([
        new TechSkill({ name: 'Standard Library', percentile: .80 }),
        new TechSkill({ name: 'SQLAlchemy', percentile: 0.40 }),
        new TechSkill({ name: 'Flask', percentile: 0.36 }),
        new TechSkill({ name: 'NumPy', percentile: 0.30 }),
        new TechSkill({ name: 'SciPy', percentile: 0.28 }),
        new TechSkill({ name: 'matplotlib', percentile: 0.14 }),
        new TechSkill({ name: 'pandas', percentile: 0.12 }),
      ])
    }),
    new TechSkill({
      name: 'JavaScript',
      percentile: .55,
      technologies: Immutable.List([
        new TechSkill({ name: 'Standard Library', percentile: .75 }),
        new TechSkill({ name: 'React', percentile: 0.70 }),
        new TechSkill({ name: 'ImmutableJS', percentile: 0.44 }),
        new TechSkill({ name: 'd3js', percentile: 0.30 }),
        new TechSkill({ name: 'lodash', percentile: 0.18 }),
        new TechSkill({ name: 'jQuery', percentile: 0.12 }),
        new TechSkill({ name: 'TypeScript', percentile: 0.07 }),
      ])
    }),
    new TechSkill({
      name: 'C++',
      percentile: .43,
      technologies: Immutable.List([
        new TechSkill({ name: 'Standard Library', percentile: .46 }),
        new TechSkill({ name: 'Boost', percentile: 0.44 }),
        new TechSkill({ name: 'Loci', percentile: 0.33 }),
        new TechSkill({ name: 'STL', percentile: 0.21 }),
        new TechSkill({ name: 'libgit2', percentile: 0.12 }),
        new TechSkill({ name: 'ACE', percentile: 0.08 }),
      ])
    }),
    new TechSkill({
      name: 'Go',
      percentile: .32,
      technologies: Immutable.List([
        new TechSkill({ name: 'Standard Library', percentile: .30 }),
        new TechSkill({ name: 'httpauth', percentile: 0.50 }),
        new TechSkill({ name: 'binpacker', percentile: 0.42 }),
        new TechSkill({ name: 'celeriac', percentile: 0.9 }),
        new TechSkill({ name: 'decimal', percentile: 0.07 }),
        new TechSkill({ name: 'walk', percentile: 0.06 }),
      ])
    }),
    new TechSkill({
      name: 'CSS',
      percentile: .16,
      technologies: Immutable.List([
        new TechSkill({ name: 'Standard Library', percentile: .24 }),
        new TechSkill({ name: 'SCSS', percentile: 0.18 }),
        new TechSkill({ name: 'LESS', percentile: 0.14 }),
      ])
    }),
    new TechSkill({
      name: 'HTML',
      percentile: .13,
      technologies: Immutable.List([
        new TechSkill({ name: 'VideoAPI', percentile: 0.18 }),
        new TechSkill({ name: 'FileAPI', percentile: 0.11 }),
      ])
    }),
  ])
});

export default SKILLS;
