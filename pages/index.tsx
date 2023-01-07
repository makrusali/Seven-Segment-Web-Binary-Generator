import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import '../styles/Home.module.css'
import SevenSegment from '../components/sevenSegment'
import ValueCard from '../components/valueCard'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


interface SegmentProps {
  decimalValue: number,
  isReverseBit: boolean,
  dotType: string
}

export default function Home() {

  const [totalSegment, setTotalSegment] = useState<number>(1);

  const segmentInitialValue = {
    decimalValue: 0,
    dotType: 'none',
    isReverseBit: false
  };
  const [segments, setSegments] = useState<SegmentProps[]>([
    segmentInitialValue
  ]);

  return (
    <>
      <Head>
        <title>Seven Segment Binary Generator</title>
        <meta name="description" content="Seven Segment Binary Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/seg-gen.svg" />
      </Head>
      <main>
        <h1>Seven Segment Binary Generator</h1>
        <div className='num-counter'>
          <p>Total</p>
          <button disabled={totalSegment == 1} onClick={() => {
            setTotalSegment(totalSegment - 1);
            setSegments(segments.slice(0, totalSegment - 1));
          }}>-</button>
          <p>{totalSegment}</p>
          <button onClick={() => {
            setTotalSegment(totalSegment + 1);
            setSegments([...segments, segmentInitialValue]);
          }}>+</button>
        </div>
        <ul>
          {
            segments.map((segment, index, _) => {
              return (
                <li key={index}>
                  <div className='seg-container'>
                    <SevenSegment dotType={segment.dotType} onValueChange={(value: number) => {
                      const temp: SegmentProps[] = segments.map((seg, i, _) => {
                        if (index == i) {
                          return { ...seg, decimalValue: value };
                        } else {
                          return seg;
                        }
                      });
                      setSegments(temp);
                    }} />
                  </div>
                  <ValueCard decimalValue={segment.decimalValue} onValueChange={(val) => {
                    const temp: SegmentProps[] = segments.map((seg, i, _) => {
                      if (index == i) {
                        return { ...seg, isReverseBit: val.isReverseBit, dotType: val.dotType };
                      } else {
                        return seg;
                      }
                    });

                    setSegments(temp);
                  }} />
                </li>
              )
            })
          }

        </ul>
      </main>
    </>
  )
}
