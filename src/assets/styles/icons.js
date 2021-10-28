import { createGlobalStyle } from 'styled-components';

export const Icons = createGlobalStyle`
[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-presentation:before {
  content: "\\e93f";
}
.icon-video:before {
  content: "\\e93b";
}
.icon-blog:before {
  content: "\\e93c";
}
.icon-external-link:before {
  content: "\\e93d";
}
.icon-options:before {
  content: "\\e93a";
  color: #A99DE0;
}
.icon-msword:before {
  content: "\\e939";
}
.icon-pin:before {
  content: "\\e937";
}
.icon-clock:before {
  content: "\\e938";
}
.icon-add-circle_outline:before {
  content: "\\e92a";
}
.icon-add-circle_solid:before {
  content: "\\e92b";
}
.icon-check-circle_outline:before {
  content: "\\e92c";
}
.icon-check:before {
  content: "\\e92d";
}
.icon-information-circle_outline:before {
  content: "\\e92e";
}
.icon-mail_outline:before {
  content: "\\e92f";
}
.icon-mail_solid:before {
  content: "\\e930";
}
.icon-phone_outline:before {
  content: "\\e931";
}
.icon-phone_solid:before {
  content: "\\e932";
}
.icon-reload_outline:before {
  content: "\\e933";
}
.icon-remove-circle_outline:before {
  content: "\\e934";
}
.icon-upload_outline:before {
  content: "\\e935";
}
.icon-warning_outline:before {
  content: "\\e936";
}
.icon-error:before {
  content: "\\e926";
}
.icon-information:before {
  content: "\\e927";
}
.icon-success:before {
  content: "\\e928";
}
.icon-warning:before {
  content: "\\e929";
}
.icon-pdf:before {
  content: "\\e900";
}
.icon-add:before {
  content: "\\e901";
}
.icon-arrow_down:before {
  content: "\\e902";
}
.icon-arrow_right:before {
  content: "\\e903";
}
.icon-close:before {
  content: "\\e904";
}
.icon-resize:before {
  content: "\\e905";
}
.icon-camera_solid:before {
  content: "\\e906";
}
.icon-delete_solid:before {
  content: "\\e907";
}
.icon-edit_solid:before {
  content: "\\e908";
}
.icon-home_solid:before {
  content: "\\e909";
}
.icon-image_solid:before {
  content: "\\e90a";
}
.icon-link_solid:before {
  content: "\\e90b";
}
.icon-linkedin_solid:before {
  content: "\\e90c";
}
.icon-notify_solid:before {
  content: "\\e90d";
}
.icon-play_solid:before {
  content: "\\e90e";
}
.icon-profile_access_solid:before {
  content: "\\e90f";
}
.icon-profile_search_solid:before {
  content: "\\e910";
}
.icon-question_solid:before {
  content: "\\e911";
}
.icon-search_solid:before {
  content: "\\e912";
}
.icon-text_solid:before {
  content: "\\e913";
}
.icon-upload_solid:before {
  content: "\\e914";
}
.icon-video_solid:before {
  content: "\\e915";
}
.icon-view_solid:before {
  content: "\\e916";
}
.icon-briefcase_outline:before {
  content: "\\e917";
}
.icon-camera_outline:before {
  content: "\\e918";
}
.icon-delete_outline:before {
  content: "\\e919";
}
.icon-edit_outline:before {
  content: "\\e91a";
}
.icon-home_outline:before {
  content: "\\e91b";
}
.icon-image_outline:before {
  content: "\\e91c";
}
.icon-link_outline:before {
  content: "\\e91d";
}
.icon-notify_outline:before {
  content: "\\e91e";
}
.icon-play_outline:before {
  content: "\\e91f";
}
.icon-profile_access_outline:before {
  content: "\\e920";
}
.icon-profile_search_outline:before {
  content: "\\e921";
}
.icon-question_outline:before {
  content: "\\e922";
}
.icon-text_outline:before {
  content: "\\e923";
}
.icon-video_outline:before {
  content: "\\e924";
}
.icon-view_outline:before {
  content: "\\e925";
}
.icon-view_outline:before {
  content: "\\e925";
}
.icon-copy:before {
  content: "\\e93e";
}
.icon-document:before {
  content: "\\e940";
}
.icon-draggable:before {
  content: "\\e941";
}
.icon-question-circle_outline:before {
  content: "\\e942";
}

.icon-share:before {
  content: "\\e949";
}

.icon-home_clicked:before {
  content: "\\e943";
  color: #444;
}
.icon-home_unclicked:before {
  content: "\\e944";
}

.icon-presentation_clicked .path1:before {
  content: "\\e950";
  color: #444;
}
.icon-presentation_clicked .path2:before {
  content: "\\e951";
  color: #444;
  margin-left: -1.07421875em;
}
.icon-presentation_clicked .path3:before {
  content: "\\e952";
  color: #444;
  margin-left: -1.07421875em;
}
.icon-presentation_clicked .path4:before {
  content: "\\e953";
  color: #444;
  margin-left: -1.07421875em;
}
.icon-presentation_clicked .path5:before {
  content: "\\e954";
  color: #fff;
  margin-left: -1.07421875em;
}
.icon-presentation_clicked .path6:before {
  content: "\\e955";
  color: #fff;
  margin-left: -1.07421875em;
}
.icon-presentation_clicked .path7:before {
  content: "\\e956";
  color: #fff;
  margin-left: -1.07421875em;
}
.icon-presentation_unclicked:before {
  content: "\\e946";
}

.icon-library_tour .path1:before {
  content: "\\e96b";
  color: #c4c4c4;
}
.icon-library_tour .path2:before {
  content: "\\e96c";
  color: #fff;
  margin-left: -0.962890625em;
}

.icon-tutorial_videos .path1:before {
  content: "\\e96d";
  color: #c4c4c4;
}
.icon-tutorial_videos .path2:before {
  content: "\\e96e";
  color: #fff;
  margin-left: -0.962890625em;
}

.icon-inspo_videos .path1:before {
  content: "\\e96f";
  color: #c4c4c4;
}
.icon-inspo_videos .path2:before {
  content: "\\e970";
  color: #fff;
  margin-left: -0.962890625em;
}
.icon-inspo_videos .path3:before {
  content: "\\e971";
  color: #fff;
  margin-left: -0.962890625em;
}
.icon-inspo_videos .path4:before {
  content: "\\e972";
  color: #fff;
  margin-left: -0.962890625em;
}

.icon-library_unclicked:before {
  content: "\\e945";
  color: #c4c4c4;
}

.icon-notifications_unclicked:before {
  content: "\\e948";
  color: #c4c4c4;
}

.icon-analytics_unclicked:before {
  content: "\\e947";
  color: #c4c4c4;
}

.icon-library_clicked .path1:before {
  content: "\\e94a";
  color: #000;
}
.icon-library_clicked .path2:before {
  content: "\\e94b";
  color: #000;
  margin-left: -0.7421875em;
}
.icon-library_clicked .path3:before {
  content: "\\e94c";
  color: #444;
  margin-left: -0.7421875em;
}
.icon-library_clicked .path4:before {
  content: "\\e94d";
  color: #444;
  margin-left: -0.7421875em;
}
.icon-library_clicked .path5:before {
  content: "\\e94e";
  color: #fff;
  margin-left: -0.7421875em;
}
.icon-library_clicked .path6:before {
  content: "\\e94f";
  color: #fff;
  margin-left: -0.7421875em;
}

.icon-analytics_clicked:before {
  content: "\\e958";
}

.icon-question_mark:before {
  content: "\\e973";
  color: #b9b9b9;
}

.icon-notifications_clicked .path1:before {
  content: "\\e959";
  color: #444;
}
.icon-notifications_clicked .path2:before {
  content: "\\e95a";
  color: #c4c4c4;
  margin-left: -0.8828125em;
}
.icon-notifications_clicked .path3:before {
  content: "\\e95b";
  color: #c4c4c4;
  margin-left: -0.8828125em;
}
.icon-notifications_clicked .path4:before {
  content: "\\e95c";
  color: #c4c4c4;
  margin-left: -0.8828125em;
}
.icon-notifications_clicked .path5:before {
  content: "\\e95d";
  color: #c4c4c4;
  margin-left: -0.8828125em;
}

.icon-share2:before {
  content: "\\e95e";
  color: #c4c4c4;
}

.icon-dolar:before {
  content: "\\e95f";
  color: #b9b9b9;
}

.icon-password_change .path1:before {
  content: "\\e965";
  color: #b9b9b9;
}
.icon-password_change .path2:before {
  content: "\\e966";
  color: #b9b9b9;
  margin-left: -0.818359375em;
}
.icon-password_change .path3:before {
  content: "\\e967";
  color: #fff;
  margin-left: -0.818359375em;
}
.icon-password_change .path4:before {
  content: "\\e968";
  color: #fff;
  margin-left: -0.818359375em;
}
.icon-password_change .path5:before {
  content: "\\e969";
  color: #fff;
  margin-left: -0.818359375em;
}

.icon-log_out:before {
  content: "\\e975";
  color: #b9b9b9;
}

.icon-account_billing .path1:before {
  content: "\\e960";
  color: #b9b9b9;
}
.icon-account_billing .path2:before {
  content: "\\e961";
  color: #fff;
  margin-left: -0.77em;
}
.icon-account_billing .path3:before {
  content: "\\e962";
  color: #fff;
  margin-left: -0.77em;
}
.icon-account_billing .path4:before {
  content: "\\e963";
  color: #fff;
  margin-left: -0.775em;
}
.icon-account_billing .path5:before {
  content: "\\e964";
  color: #fff;
  margin-left: -0.775em;
}

.icon-profile_tour:before {
  content: "\\e96a";
  color: #c4c4c4;
}

.icon-settings_gear:before {
  content: "\\e974";
  color: #b9b9b9;
}

.icon-polygon_2:before {
  content: "\\e957";
  color: #c4c4c4;
}

.icon-user_plus:before {
  content: "\\e976";
  color: #c4c4c4;
}
`;

export const IconsNames = [
  'information',
  'warning',
  'success',
  'error',
  'pdf',
  'add',
  'arrow_down',
  'arrow_right',
  'close',
  'resize',
  'camera_solid',
  'delete_solid',
  'edit_solid',
  'home_solid',
  'image_solid',
  'link_solid',
  'linkedin_solid',
  'notify_solid',
  'play_solid',
  'profile_access_solid',
  'profile_search_solid',
  'question_solid',
  'search_solid',
  'text_solid',
  'upload_solid',
  'video_solid',
  'view_solid',
  'briefcase_outline',
  'camera_outline',
  'delete_outline',
  'edit_outline',
  'home_outline',
  'image_outline',
  'link_outline',
  'notify_outline',
  'play_outline',
  'profile_access_outline',
  'profile_search_outline',
  'question_outline',
  'text_outline',
  'video_outline',
  'view_outline',
  'add_circle_outline',
  'add_circle_solid',
  'check_circle_outline',
  'check',
  'information_circle_outline',
  'mail_outline',
  'mail_solid',
  'phone_outline',
  'phone_solid',
  'reload_outline',
  'remove_circle_outline',
  'upload_outline',
  'warning_outline',
  'clock',
  'pin',
  'copy',
  'document',
  'draggable',
  'question-circle_outline',
  'share',
  'share2',
  'home_clicked',
  'home_unclicked',
  'presentation_clicked',
  'presentation_unclicked',
  'library_tour',
  'tutorial_videos',
  'inspo_videos',
  'library_unclicked',
  'notifications_unclicked',
  'analytics_unclicked',
  'library_clicked',
  'analytics_clicked',
  'question_mark',
  'notifications_clicked',
  'dolar',
  'password_change',
  'log_out',
  'account_billing',
  'profile_tour',
  'settings_gear',
  'polygon_2',
  'user_plus',
];
