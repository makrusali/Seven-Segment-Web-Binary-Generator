import { ChangeEvent, useState } from "react";

interface DisplayProps {
  decimalValue: number,
  isReverseBit: boolean,
  dotType: string
}

export default function ValueCard(props: {
  decimalValue: number,
  onValueChange: (displayProps: DisplayProps) => void
}) {

  const [displayProps, setDisplayProps] = useState<DisplayProps>({
    decimalValue: props.decimalValue,
    dotType: 'none',
    isReverseBit: false
  });

  function decToBin(value: number, isReverse: boolean): string {
    let hex = '';
    for (let i = 7; i >= 1; i--) {
      if (!(value & (1 << i))) {
        hex += '0';
      } else {
        break;
      }
    }
    hex += value.toString(2);
    return (isReverse ? hex.split('').reverse().join("") : hex);
  }

  function decToHex(value: number): string {
    return '0x' + ((value <= 15 ? '0' + value.toString(16) : value.toString(16))).toUpperCase();
  }

  function onRadioChange(value: string) {
    const temp: DisplayProps = { ...displayProps, dotType: value };
    setDisplayProps(temp);
    props.onValueChange(temp);
  }

  return (
    <div className='card'>
      <h1 className='card-title'>Binary Value</h1>
      <input className='card-bit-value' type="text" value={`0b${decToBin(props.decimalValue, displayProps?.isReverseBit)}`} onChange={() => { }} />
      <h1 className='card-title'>Hex Value</h1>
      <input className='card-bit-value' type="text" value={decToHex(Number.parseInt(decToBin(props.decimalValue, displayProps?.isReverseBit), 2))} onChange={() => { }} />
      <div className='r-bit'>
        <label htmlFor="reverse-bit">Reverser Bit</label>
        <input id='reverse-bit' type="checkbox" onChange={(e: ChangeEvent) => {
          const isReverseBit = (e.target as HTMLInputElement).checked;
          const temp: DisplayProps = { ...displayProps, isReverseBit };
          setDisplayProps(temp);
          props.onValueChange(temp);
        }} />
      </div>
      <ul>
        <p className='r-title'>Dot Type</p>
        <li className='r-item'>
          <label>none</label>
          <input type="radio" value='none' checked={displayProps.dotType == 'none'} onChange={(e: ChangeEvent) => {
            onRadioChange((e.target as HTMLInputElement).value);
          }} />
        </li>
        <li className='r-item'>
          <label>Single</label>
          <input type="radio" value='single' checked={displayProps.dotType == 'single'} onChange={(e: ChangeEvent) => {
            onRadioChange((e.target as HTMLInputElement).value);
          }} />
        </li>
        <li className='r-item'>
          <label>Double</label>
          <input type="radio" value='double' checked={displayProps.dotType == 'double'} onChange={(e: ChangeEvent) => {
            onRadioChange((e.target as HTMLInputElement).value);
          }} />
        </li>
      </ul>
    </div>
  );
}