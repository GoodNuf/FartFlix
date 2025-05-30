import BaseComponent from '@primevue/core/basecomponent';
import ButtonGroupStyle from 'primevue/buttongroup/style';
import { createElementBlock, openBlock, mergeProps, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseButtonGroup',
  "extends": BaseComponent,
  style: ButtonGroupStyle,
  provide: function provide() {
    return {
      $pcButtonGroup: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ButtonGroup',
  "extends": script$1,
  inheritAttrs: false
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx('root'),
    role: "group"
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "default")], 16);
}

script.render = render;

export { script as default };
//# sourceMappingURL=index.mjs.map
