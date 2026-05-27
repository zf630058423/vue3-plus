import {
  ElAutocomplete,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  // ElColorPickerPanel,
  ElDatePicker,
  // ElDatePickerPanel,
  ElInput,
  ElInputNumber,
  ElInputTag,
  ElMention,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTreeSelect,
  ElUpload,
  ElDivider,
} from 'element-plus'

const componentMap = {
  Autocomplete: ElAutocomplete,
  Cascader: ElCascader,
  Checkbox: ElCheckbox,
  CheckboxGroup: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  ColorPicker: ElColorPicker,
  // ColorPickerPanel: ElColorPickerPanel,
  DatePicker: ElDatePicker,
  // DatePickerPanel: ElDatePickerPanel,s
  Input: ElInput,
  InputNumber: ElInputNumber,
  InputTag: ElInputTag,
  Mention: ElMention,
  RadioGroup: ElRadioGroup,
  RadioButton: ElRadioGroup,
  Rate: ElRate,
  Select: ElSelect,
  SelectV2: ElSelectV2,
  Slider: ElSlider,
  Switch: ElSwitch,
  TimePicker: ElTimePicker,
  TimeSelect: ElTimeSelect,
  Transfer: ElTransfer,
  TreeSelect: ElTreeSelect,
  Upload: ElUpload,
  Divider: ElDivider,
}

// 将PascalCase转换为SNAKE_CASE
function transformKeys(obj) {
  return Object.entries(obj).reduce((acc, [key]) => {
    const newKey = key
      .replace(/([A-Z])/g, '_$1')
      .replace(/^_/, '')
      .toUpperCase()
    acc[newKey] = key
    return acc
  }, {})
}
const componentNameEnum = transformKeys(componentMap)

export { componentMap, componentNameEnum }
