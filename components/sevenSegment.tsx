import { useState } from 'react'

export default function SevenSegment(props: {
    dotType: string,
    onValueChange: (value: number) => void
}) {

    const [decimalValue, setDecimalValue] = useState(0);

    function checkBit(value: number, pos: number): boolean {
        if (((value >> pos) & 1) == 1) return true;
        return false;
    }

    function toogleBit(value: number, bitPos: number): number {
        if (!checkBit(value, bitPos)) {
            return value | (1 << bitPos);
        }
        return value & ~(1 << bitPos);;
    }

    function onClickHandler(bitPos: number): void {
        let temp = decimalValue;
        temp = toogleBit(temp, bitPos);
        setDecimalValue(temp);
        props.onValueChange(temp);
    }

    return (
        <div className='seg'>
            {props.dotType == 'single' && <div onClick={() => { onClickHandler(7); }} className={`single-dot ${!checkBit(decimalValue, 7) && 'sdot-off'}`}></div>}
            {props.dotType == 'double' && <div onClick={() => { onClickHandler(7); }} className={`double-dot ${!checkBit(decimalValue, 7) && 'ddot-off'}`}><span></span><span></span></div>}

            {/* SEGMENT A */}
            <div className='seg-h' onClick={() => { onClickHandler(0); }}>
                {checkBit(decimalValue, 0) ?
                    <><div></div><div></div><div></div></>
                    : <><div className='seghl-off'></div><div className='segc-off'></div><div className='seghr-off'></div></>}
            </div>

            <div className='seg-lr'>
                {/* SEGMENT F */}
                <div className='seg-v' onClick={() => { onClickHandler(5); }}>
                    {checkBit(decimalValue, 5) ?
                        <><div></div><div></div><div></div></>
                        : <><div className='segvt-off'></div><div className='segc-off'></div><div className='segvb-off'></div></>}
                </div>
                {/* SEGMENT B */}
                <div className='seg-v' onClick={() => { onClickHandler(1); }}>
                    {checkBit(decimalValue, 1) ?
                        <><div></div><div></div><div></div></>
                        : <><div className='segvt-off'></div><div className='segc-off'></div><div className='segvb-off'></div></>}

                </div>
            </div>

            {/* SEGMENT G */}
            <div className='seg-h' onClick={() => { onClickHandler(6); }}>
                {checkBit(decimalValue, 6) ?
                    <><div></div><div></div><div></div></>
                    : <><div className='seghl-off'></div><div className='segc-off'></div><div className='seghr-off'></div></>}
            </div>

            <div className='seg-lr'>
                {/* SEGMENT E */}
                <div className='seg-v' onClick={() => { onClickHandler(4); }}>
                    {checkBit(decimalValue, 4) ?
                        <><div></div><div></div><div></div></>
                        : <><div className='segvt-off'></div><div className='segc-off'></div><div className='segvb-off'></div></>}
                </div>
                <div className='seg-v' onClick={() => { onClickHandler(2); }}>
                    {/* SEGMENT C */}
                    {checkBit(decimalValue, 2) ?
                        <><div></div><div></div><div></div></>
                        : <><div className='segvt-off'></div><div className='segc-off'></div><div className='segvb-off'></div></>}
                </div>
            </div>

            <div className='seg-h' onClick={() => { onClickHandler(3); }}>
                {/* SEGMENT D */}
                {checkBit(decimalValue, 3) ?
                    <><div></div><div></div><div></div></>
                    : <><div className='seghl-off'></div><div className='segc-off'></div><div className='seghr-off'></div></>}
            </div>
        </div >
    );
}