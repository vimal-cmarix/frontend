<h3>Examples:</h3>

```js
import CardSkill from '@components/molecules/CardSkill';
import { CardSkillWrapper } from '@components/molecules/CardSkill/style';

() => {
  return (
    <CardSkillWrapper>
      <CardSkill
        level={5}
        title="C++"
        levelText="Level: 5"
        relatedText="4 related content"
        showIcon
      />
      <CardSkill
        level={5}
        title="C++"
        levelText="Level: 5"
        relatedText="4 related content"
        showIcon
      />
      <CardSkill
        level={4}
        title="C++"
        levelText="Level: 4"
        relatedText="4 related content"
        showIcon
      />
      <CardSkill
        level={3}
        title="C++"
        levelText="Level: 3"
        relatedText="4 related content"
        showIcon
      />
      <CardSkill
        level={2}
        title="C++"
        levelText="Level: 2"
        relatedText="4 related content"
        showIcon
      />
      <CardSkill
        level={1}
        title="C++"
        levelText="Level: 1"
        relatedText="4 related content"
        showIcon
      />
    </CardSkillWrapper>
  );
};
```
