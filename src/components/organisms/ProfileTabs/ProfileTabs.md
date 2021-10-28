<h3>Examples:</h3>

- Default

```js
import ProfileTabs from '@components/organisms/ProfileTabs';
import ProfileTab from '@components/molecules/ProfileTab';

() => {
  return (
    <ProfileTabs>
      <ProfileTab text="Overview" isActive />
      <ProfileTab text="Culture Fit" />
      <ProfileTab text="Content" />
      <ProfileTab text="Resume" />
    </ProfileTabs>
  );
};
```

- Timeline

```js
import ProfileTab from '@components/molecules/ProfileTab';

() => {
  return (
    <ProfileTabs isTimeline>
      <ProfileTab isTimeline text="All" isActive />
      <ProfileTab isTimeline text="Education" onClickEditButton={() => {}} />
      <ProfileTab isTimeline text="Experience" onClickEditButton={() => {}} />
      <ProfileTab isTimeline text="Certificates" onClickEditButton={() => {}} />
      <ProfileTab isTimeline text="Skills" />
    </ProfileTabs>
  );
};
```
