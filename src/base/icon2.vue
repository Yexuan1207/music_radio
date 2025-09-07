<script lang="ts">
import { defineComponent, h, render } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

const divBox = {
  render() {
    return h("div", "dfssdf");
  },
};
export default defineComponent({
  name: "Icon2",

  components: {
    IconifyIcon,
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  render() {
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        style: attrs?.style
          ? Object.assign(attrs.style, {
              outline: "none",
            })
          : {
              outline: "none",
            },
        class: "iconstyle",

        ...attrs,
      },
      {
        default: () => [],
      }
    );
  },
});
</script>

<style lang="scss" scoped>
.iconstyle {
  :hover {
    opacity: 0.8;
  }
  cursor: pointer;
}
</style>
