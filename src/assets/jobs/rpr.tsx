import * as React from 'react';

function SvgRpr(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1000 1000'
      width='1em'
      height='1em'
      className='ijob'
      {...props}
    >
      <path d='M846 560q-2-4-11 0-6 2-21 12-76 48-180 79-107 31-182 25-58-4-98-19l47-150q22 54 72 83 40 23 85 22.5t84-22.5 62-62q22-37 23-79t-17-79.5-52-62.5q-1-1-1-17 0-18-2-26-2-15-9-18t-20 5q-7 5-20 18-10 9-11 9-34-8-67.5-1.5T465 301l36-116q6-16 9-39 4-33-6-36.5T477 135q-11 20-16 36L299 622q-17-17-24-39t-5-51q1-18 7-51l1-5q5-26-.5-28.5t-20 20T232 516q-15 33-19 61-5 41 7 77 13 41 48 67l-18 78q-5 15-7 33-2 27 8.5 30.5T276 843q10-15 15-30l30-66q17 5 32 8 63 10 139-2 83-12 164-50 89-41 164-108 16-14 21-21 8-10 5-14zM466 390q15-24 39-38t52.5-14.5 53 14 38.5 39 14 52.5-14 53-38.5 38.5-52.5 14-53-14-39-39-14-52.5 14-53z' />
    </svg>
  );
}

export default SvgRpr;