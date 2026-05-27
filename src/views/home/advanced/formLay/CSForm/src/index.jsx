import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus'
import { set } from 'lodash-es'
import { componentMap, componentNameEnum } from './helper/componentMap'
import { setGridProp, getSlot, setRules, setFormItemClass } from './helper/index'
import { useRenderComponent } from './hooks/useRenderComponent'
import { isFunction } from '@/utils/is'
import './style.scss'

const { renderComponent, getComponentExpose } = useRenderComponent()

export default defineComponent({
  name: 'FormBasic',
  props: {
    // 表单数据对象
    model: {
      type: Object,
    },
    // 生成Form的布局结构数组
    schema: {
      type: Array,
      default: () => [],
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: {
      type: Boolean,
      default: true,
    },
    // 是否自定义内容
    isCustom: {
      type: Boolean,
      default: false,
    },
    // 是否需要栅格布局
    isCol: {
      type: Boolean,
      default: true,
    },
    rowProps: {
      type: Object,
    },
    colProps: {
      type: Object,
    },
    // 父组件传入的slots
    extraSlots: {
      type: Object,
    },

    /* 基于项目需求改写默认配置 */
    // 表单域标签的后缀
    labelSuffix: {
      type: String,
      default: ':',
    },
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: false,
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['enter', 'update:formRef'],
  inheritAttrs: false,
  setup(props, { slots, attrs, emit, expose }) {
    const formRef = ref()
    onMounted(() => {
      emit('update:formRef', formRef.value)
    })

    const getProps = computed(() => ({ ...props, ...attrs }))

    const getSlots = computed(() => {
      return { ...(props.extraSlots ?? {}), ...slots }
    })

    const rulesConfig = ref({})
    watch(
      () => [props.schema, props.rules],
      () => {
        rulesConfig.value = setRules(props.schema, unref(getProps))
        setTimeout(() => {
          unref(formRef)?.clearValidate()
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    // 存储form-item实例
    const formItemComponents = ref({})

    const getFormItemExpose = (prop) => {
      return unref(formItemComponents)[prop]
    }

    const setFormItemRefMap = (ref, prop) => {
      formItemComponents.value[prop] = ref
    }

    const delSchema = (prop) => {
      const { schema } = unref(getProps)
      const index = schema.findIndex((v) => v.prop === prop)
      if (index > -1) {
        schema.splice(index, 1)
      }
    }

    const addSchema = (formSchema, index) => {
      const { schema } = unref(getProps)
      if (index !== void 0) {
        schema.splice(index, 0, formSchema)
        return
      }
      schema.push(formSchema)
    }

    const setSchema = (schemaProps) => {
      const { schema } = unref(getProps)
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.prop === item.prop) {
            set(v, item.path, item.value)
          }
        }
      }
    }

    expose({
      formRef,
      delSchema,
      addSchema,
      setSchema,
      getComponentExpose,
      getFormItemExpose,
    })

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps)
      const content = isCol ? (
        <ElRow {...(unref(getProps).rowProps || {})}>{renderFormItemWrap()}</ElRow>
      ) : (
        renderFormItemWrap()
      )
      return content
    }

    // 是否要渲染el-col
    const renderFormItemWrap = () => {
      // hidden属性表示隐藏，不做渲染
      const { schema = [], isCol } = unref(getProps)

      const list = schema
        .filter((item) => !item.hidden)
        .map((item) => {
          const isDivider = item.component === componentNameEnum.DIVIDER
          const Com = componentMap[item.component]

          // 如果是 Divider 组件，需要自己占用一行
          if (isDivider) {
            return <Com {...{ contentPosition: 'left', ...item.componentProps }}>{item?.label}</Com>
          }

          if (!isCol) {
            return renderFormItem(item)
          }

          if (
            item.rowProps?.slots === true &&
            item.prop &&
            isFunction(unref(getSlots)[`row-${item.prop}`])
          ) {
            return unref(getSlots)[`row-${item.prop}`]({
              item,
              model: unref(getProps).model,
            })
          }
          if (isFunction(unref(getSlots)[`row-${item.rowProps?.slots?.default}`])) {
            return unref(getSlots)[`row-${item.rowProps?.slots?.default}`]({
              item,
              model: unref(getProps).model,
            })
          }

          return <ElCol {...setGridProp(unref(getProps), item)}>{renderColContent(item)}</ElCol>
        })

      if (isFunction(unref(getSlots)[`append`])) {
        list.push(unref(getSlots)[`append`]())
      }

      return list
    }

    // 渲染栅格列内容
    const renderColContent = (item) => {
      if (isFunction(item.colProps?.slots?.default)) {
        return item.colProps?.slots?.default({ item, model: unref(getProps).model })
      }

      if (
        item.colProps?.slots === true &&
        item.prop &&
        isFunction(unref(getSlots)[`col-${item.prop}`])
      ) {
        return unref(getSlots)[`col-${item.prop}`]({
          item,
          model: unref(getProps).model,
        })
      }
      if (isFunction(unref(getSlots)[`col-${item.colProps?.slots?.default}`])) {
        return unref(getSlots)[`col-${item.colProps?.slots?.default}`]({
          item,
          model: unref(getProps).model,
        })
      }

      if (item.colProps?.isEmpty) {
        return
      }

      return renderFormItem(item)
    }

    // 渲染formItem
    const renderFormItem = (item) => {
      const { isCol } = unref(getProps)
      const { formItemProps } = item || {}

      // 兼容MixInput
      if (item.component === 'MixInput') {
        return renderComponent(item, unref(getProps).model, unref(getProps))
      }

      // default
      const formItemSlots = {
        default: (args) => {
          // default传入渲染函数
          if (isFunction(formItemProps?.slots?.default)) {
            return formItemProps?.slots?.default({ item, model: unref(getProps).model, ...args })
          }

          // slots 或 slots.default 为true
          if (
            item.prop &&
            (formItemProps?.slots === true || formItemProps?.slots?.default === true) &&
            isFunction(unref(getSlots)[`formItem-${item.prop}`])
          ) {
            return unref(getSlots)[`formItem-${item.prop}`]({
              item,
              model: unref(getProps).model,
              ...args,
            })
          }

          // slots.default 为具体插槽名
          if (isFunction(unref(getSlots)[`formItem-${formItemProps?.slots?.default}`])) {
            return unref(getSlots)[`formItem-${formItemProps?.slots?.default}`]({
              item,
              model: unref(getProps).model,
              ...args,
            })
          }

          return renderComponent(item, unref(getProps).model, unref(getProps))
        },
      }

      // label
      if (isFunction(formItemProps?.slots?.label)) {
        // slots.label 为渲染函数
        formItemSlots.label = (args) => {
          return formItemProps?.slots?.label({ item, model: unref(getProps).model, ...args })
        }
      } else if (
        item.prop &&
        formItemProps?.slots?.label === true &&
        isFunction(unref(getSlots)[`formLabel-${item.prop}`])
      ) {
        // slots.label 为true
        formItemSlots.label = (args) => {
          return unref(getSlots)[`formLabel-${item.prop}`]({
            item,
            model: unref(getProps).model,
            label: `${item.label}${args.label}`,
          })
        }
      } else if (isFunction(unref(getSlots)[`formLabel-${formItemProps?.slots?.label}`])) {
        // slots.label 为具体插槽名
        formItemSlots.label = (args) => {
          return unref(getSlots)[`formLabel-${formItemProps?.slots?.label}`]({
            item,
            model: unref(getProps).model,
            label: `${item.label}${args.label}`,
          })
        }
      } else if (item.hasOwnProperty('label')) {
        // 有label字段才渲染
        formItemSlots.label = (args) => (item.label ? `${item.label}${args.label ?? ''}` : '')
      }

      // error
      if (isFunction(formItemProps?.slots?.error)) {
        // slots.error 为渲染函数
        formItemSlots.error = (args) => {
          return formItemProps?.slots?.error({ item, model: unref(getProps).model, ...args })
        }
      } else if (
        item.prop &&
        formItemProps?.slots?.error === true &&
        isFunction(unref(getSlots)[`formError-${item.prop}`])
      ) {
        // slots.error 为true
        formItemSlots.error = (args) => {
          return unref(getSlots)[`formError-${item.prop}`]({
            item,
            model: unref(getProps).model,
            ...args,
          })
        }
      } else if (isFunction(unref(getSlots)[`formError-${formItemProps?.slots?.error}`])) {
        // slots.error 为具体插槽名
        formItemSlots.error = (args) => {
          return unref(getSlots)[`formError-${formItemProps?.slots?.error}`]({
            item,
            model: unref(getProps).model,
            ...args,
          })
        }
      }

      return (
        <ElFormItem
          v-show={!item.hidden}
          ref={(el) => setFormItemRefMap(el, item.prop)}
          // TODO 暂时兼容labelWidth，以后会删除
          {...Object.assign({ labelWidth: item.labelWidth }, formItemProps)}
          prop={item.prop}
          key={item.prop}
          style={{ width: isCol ? '100%' : 'auto' }}
          class={setFormItemClass(unref(getProps), item)}
        >
          {formItemSlots}
        </ElFormItem>
      )
    }

    // 过滤传入Form组件的属性
    const getFormBindValue = () => {
      const delKeys = [
        'schema',
        'isCol',
        'autoSetPlaceholder',
        'isCustom',
        'model',
        'rowProps',
        'colProps',
      ]
      const formProps = { ...unref(getProps) }
      for (const key in formProps) {
        if (delKeys.indexOf(key) !== -1) {
          delete formProps[key]
        }
      }
      return formProps
    }

    const onKeydown = (e) => {
      if (e.key === 'Enter') {
        emit('enter')
      }
    }

    return () => (
      <ElForm
        class="basic-form"
        ref={formRef}
        {...getFormBindValue()}
        rules={rulesConfig.value}
        model={unref(getProps).model}
        onKeydown={onKeydown}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {{
          // 如果需要自定义，就什么都不渲染，而是提供默认插槽
          default: () => {
            const { isCustom } = unref(getProps)
            return isCustom ? getSlot(unref(getSlots), 'default') : renderWrap()
          },
        }}
      </ElForm>
    )
  },
})
