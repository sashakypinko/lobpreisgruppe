/* eslint-disable max-len */
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const NoiseClass = ({
  text,
  db,
}) => (
  <SvgIcon
    sx={{ width: 50, height: 36 }}
    viewBox="0 0 150 100.8"
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m1.6086679 2.7201068h54.7299991v54.6969642h-54.7299991z" fill="none" strokeWidth="1.15427" />
    <g stroke="#000">
      <text
        style={{
          fontSize: 37.3333, fontFamily: 'sans-serif', letterSpacing: 0, wordSpacing: 0,
        }}
        x="67.514103"
        y="95.869598"
      >
        <tspan fontFamily="sans-serif" fontWeight="bold" fontSize="37.3333" x="67.512103" y="95.869598">{Number(db) || ''}</tspan>
      </text>
      <path
        d="m54.482221 9.905051a.62838713.62838713 0 0 0 -.634641.01863l-22.983022 14.549816h-25.9452003c-.3423203 0-.6252605.282929-.6252605.625261v30.820668c0 .342321.2829293.625261.6252605.625261h25.9483273l22.984585 14.235625a.62526084.62526084 0 0 0 .953522-.531469v-59.796689c0-.226644-.125059-.437682-.323582-.547103z"
        fill="none"
        strokeWidth="2.65736"
      />
      <path
        d="m77.565391 18.069653a.62526084.62526084 0 0 0 -1.119218.554918 52.662592 52.662592 0 0 1 1.445917 43.450936.63151344.63151344 0 0 0 .576801.864424.62838713.62838713 0 0 0 .578369-.384536 53.919365 53.919365 0 0 0 -1.480305-44.487306zm-9.206966 4.095457a.63151344.63151344 0 0 0 -.284499.836285 42.830365 42.830365 0 0 1 1.169236 35.280344.62526084.62526084 0 0 0 .561173.890996h.0047c.264156 0 .500207-.167252.589308-.415798a44.08089 44.08089 0 0 0 -1.203582-36.307335.62369769.62369769 0 0 0 -.837848-.284499zm-8.678618 3.74844a.62526084.62526084 0 0 0 -.284501.837848 34.46125 34.46125 0 0 1 .93633 28.3165.63307657.63307657 0 0 0 .578364.862861.62526084.62526084 0 0 0 .578369-.387663 35.710208 35.710208 0 0 0 -.970718-29.345053.62213452.62213452 0 0 0 -.559609-.350137z"
        fill="#262626"
        strokeWidth="1.56315"
      />
      <text fill="none" x="7.858579" y="27.483438">
        <tspan />
      </text>
      <g fontFamily="sans-serif" letterSpacing="0" strokeLinecap="butt" strokeLinejoin="miter" wordSpacing="0">
        <text fontSize="29.179" strokeWidth="1.56315" x="19.432293" y="51.683939">
          <tspan fontFamily="sans-serif" fontWeight="bold" fontSize="29.179" strokeWidth=".668964" x="19.432293" y="51.683939">{text}</tspan>
        </text>
        <text fontSize="29.8667" x="110.3182" y="95.751427">
          <tspan fontFamily="sans-serif" fontSize="29.8667" x="110.3182" y="95.751427">{Number(db) ? 'dB' : ''}</tspan>
        </text>
      </g>
    </g>
  </SvgIcon>
);

export default NoiseClass;

NoiseClass.propTypes = {
  text: PropTypes.string.isRequired,
  db: PropTypes.string.isRequired,
};
