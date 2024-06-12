import React, { useState } from 'react'

export interface SelectBadgesItem {
  label: string
  value: string
  sublabel?: string
  group?: string
}

interface OwnProps {
  items: SelectBadgesItem[]
  groups?: string[]
  value?: string[]
  onChange?: (value?: string[]) => void
}

const SelectBadges = (props: OwnProps): React.ReactElement => {
  const [componentValue, setComponentValue] = useState<string[]>([])

  function handleSelection (value: string): void {
    const newComponentValue = [...componentValue]

    const valueIndex = newComponentValue.findIndex(item => item === value)
    if (valueIndex >= 0) newComponentValue.splice(valueIndex, 1)
    else newComponentValue.push(value)

    setComponentValue(newComponentValue.sort())

    if (props.onChange != null) {
      props.onChange(newComponentValue)
    }
  }

  function RenderBadge (item: SelectBadgesItem): React.JSX.Element {
    return (<div className={`select-badge-item ${componentValue.includes(item.value) ? 'select-badge-item-selected' : ''}`} key={item.value} onClick={() => { handleSelection(item.value) }}>
      <span>{item.label}</span>
      {
        item.sublabel != null && <span><br/>{item.sublabel}</span>
      }
    </div>)
  }

  return (<div>
    <div className="select-badges-container">
      {
        props.groups?.map(group => <div className="select-badges-group" key={group}>
          <span>{group}</span>
          {
            props.items.filter(item => item.group === group).map(item => RenderBadge(item))
          }
        </div>)
      }
      <div className="select-badges-group">
        {
          props.items.filter(item => item.group == null).map(item => RenderBadge(item))
        }
      </div>
    </div>
  </div>)
}

export default SelectBadges
