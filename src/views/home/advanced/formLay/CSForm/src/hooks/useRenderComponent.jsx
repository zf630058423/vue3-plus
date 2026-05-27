import { get, set } from 'lodash-es'
import { ref, computed } from 'vue'

// import { businessMap, inputMap } from '../helper/businessMap'
import { componentMap, componentNameEnum } from '../helper/componentMap'
import {
  setComponentSlots,
  setComponentProps,
  setComponentStyle,
  setPlaceholder,
} from '../helper/index'
import { isComponent } from '../utils'
import { useRenderSelect } from './useRenderSelect'
import { useRenderRadio } from './useRenderRadio'
import { useRenderCheckbox } from './useRenderCheckbox'

const { renderSelectOptions } = useRenderSelect()
const { renderRadioOptions } = useRenderRadio()
const { renderCheckboxOptions } = useRenderCheckbox()

export const useRenderComponent = () => {
  // 存储表单实例
  const formComponents = ref({})

  const getComponentExpose = (prop) => {
    return unref(formComponents)[prop]
  }

  const setComponentRefMap = (ref, prop) => {
    formComponents.value[prop] = ref
  }

  const renderComponent = (item, model, props) => {
    const { componentProps, component } = item || {}

    // const BusinessCom = businessMap[component] ?? inputMap[component]
    const Com = componentMap[component]

    const componentSlots = componentProps?.slots || {}
    const slotsMap = {
      ...setComponentSlots(componentSlots),
    }

    const itemVal = computed({
      get: () => {
        return get(model, item.prop)
      },
      set: (val) => {
        set(model, item.prop, val)
      },
    })

    if (isComponent(component)) {
      const componentCom = toRaw(component)
      return (
        <componentCom
          vModel={itemVal.value}
          {...(props?.autoSetPlaceholder && setPlaceholder(item, props))}
          {...setComponentProps(item)}
          style={setComponentStyle(item)}
        />
      )
    }
    // else if (BusinessCom) {
    //   return (
    //     <BusinessCom
    //       vModel={itemVal.value}
    //       model={model}
    //       {...(props?.autoSetPlaceholder && { ...setPlaceholder(item, props) })}
    //       {...setComponentProps(item, props)}
    //       style={setComponentStyle(item)}
    //     >
    //       {{ ...slotsMap }}
    //     </BusinessCom>
    //   )
    // }
    else if (Com) {
      //  如果是select组件，并且没有自定义模板，自动渲染options
      if (component === componentNameEnum.SELECT) {
        slotsMap.default = !componentSlots.default
          ? () => renderSelectOptions(item)
          : () => {
              return componentSlots.default(unref(componentProps?.options))
            }
      }

      // 虚拟列表
      if (component === componentNameEnum.SELECT_V2 && componentSlots.default) {
        slotsMap.default = ({ item }) => {
          return componentSlots.default(item)
        }
      }

      // 单选框组和按钮样式
      if (
        component === componentNameEnum.RADIO_GROUP ||
        component === componentNameEnum.RADIO_BUTTON
      ) {
        slotsMap.default = !componentSlots.default
          ? () => renderRadioOptions(item)
          : () => {
              return componentSlots.default(unref(componentProps?.options))
            }
      }

      // 多选框组和按钮样式
      if (
        component === componentNameEnum.CHECKBOX_GROUP ||
        component === componentNameEnum.CHECKBOX_BUTTON
      ) {
        slotsMap.default = !componentSlots.default
          ? () => renderCheckboxOptions(item)
          : () => {
              return componentSlots.default(unref(componentProps?.options))
            }
      }

      return item.component === componentNameEnum.UPLOAD ? (
        <Com
          vModel:file-list={itemVal.value}
          ref={(el) => setComponentRefMap(el, item.prop)}
          {...(props?.autoSetPlaceholder && setPlaceholder(item, props))}
          {...setComponentProps(item)}
          style={setComponentStyle(item)}
        >
          {{ ...slotsMap }}
        </Com>
      ) : (
        <Com
          vModel={itemVal.value}
          ref={(el) => setComponentRefMap(el, item.prop)}
          {...(props?.autoSetPlaceholder && setPlaceholder(item, props))}
          {...setComponentProps(item)}
          style={setComponentStyle(item)}
        >
          {{ ...slotsMap }}
        </Com>
      )
    } else {
      return 'Comp. not found'
    }
  }

  return {
    renderComponent,
    getComponentExpose,
  }
}
