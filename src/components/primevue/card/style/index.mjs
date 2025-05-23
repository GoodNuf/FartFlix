import { style } from '@primeuix/styles/card';
import BaseStyle from '@primevue/core/base/style';

var classes = {
  root: 'p-card p-component',
  header: 'p-card-header',
  body: 'p-card-body',
  caption: 'p-card-caption',
  title: 'p-card-title',
  subtitle: 'p-card-subtitle',
  content: 'p-card-content',
  footer: 'p-card-footer'
};
var CardStyle = BaseStyle.extend({
  name: 'card',
  style: style,
  classes: classes
});

export { CardStyle as default };
//# sourceMappingURL=index.mjs.map
