import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  color?: string
}

const Checkbox: React.FC<Props> = ({
  name,
  value,
  checked,
  onChange,
  color,
  ...props
}) => (
  <label
    className="relative cursor-pointer border-b-4 border-transparent py-0.5 text-sm before:content-['#'] aria-selected:border-var"
    aria-selected={checked}
    style={{ '--color': color } as React.CSSProperties}>
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="absolute opacity-0"
      {...props}
    />
    {value}
  </label>
)

export default Checkbox
