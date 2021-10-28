<h3>Examples:</h3>

```js
import ProficiencyLevel from '@components/molecules/ProficiencyLevel';

() => {
  return (
    <ProficiencyLevel
      level={5}
      text="I’m like friggin yoda and the force with this skill"
    />
    <ProficiencyLevel
      level={4}
      text="I mean I can’t do this in my sleep but that doesn’t mean I can’t do it half-asleep"
    />
    <ProficiencyLevel
      level={3}
      text="The definition of “just good enough to get the job done”"
    />
    <ProficiencyLevel
      isActive
      level={2}
      text="If you’re a complete noob, just take the L and press 1"
    />
    <ProficiencyLevel
      level={1}
      text="I like... kinda know it but not really? "
    />
  );
};
```
