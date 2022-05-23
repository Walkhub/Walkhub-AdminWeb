const CalendarIcon: React.FC<{
  color: string;
}> = ({ color }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='calendarIcon'
    >
      <g id='그룹_1095' data-name='그룹 1095' transform='translate(-872 -590)'>
        <rect
          id='사각형_1957'
          data-name='사각형 1957'
          width='24'
          height='24'
          transform='translate(872 590)'
          fill='none'
        />
        <path
          id='Icon_ionic-md-calendar'
          data-name='Icon ionic-md-calendar'
          d='M20.333,15.333h-5v5h5ZM18.666,4.5V6.167H10.333V4.5h-2.5V6.167H6.583A2.089,2.089,0,0,0,4.5,8.25V22.416A2.089,2.089,0,0,0,6.583,24.5H22.416A2.089,2.089,0,0,0,24.5,22.416V8.25a2.089,2.089,0,0,0-2.083-2.083h-1.25V4.5Zm3.75,17.916H6.583V11.375H22.416Z'
          transform='translate(869.5 587.5)'
          fill={color}
        />
      </g>
    </svg>
  );
};
export default CalendarIcon;
