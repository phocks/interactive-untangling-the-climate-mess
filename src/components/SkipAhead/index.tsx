import React, { useEffect, useRef, useState } from "react";
import Portal from "react-portal";
import a2o from "@abcnews/alternating-case-to-object";

import styles from "./styles.scss";

const BackgroundShape = ({ color = "#2A4059" }) => {
  return (
    <div className={styles.svgContainer}>
      <svg
        width="284"
        height="46"
        viewBox="0 0 284 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <mask id="path-1-inside-1" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M254.694 25.6358L254.694 25.6408C254.691 25.6646 254.679 25.7751 254.626 25.9928C254.56 26.2671 254.448 26.6293 254.279 27.0832C253.94 27.9937 253.425 29.1288 252.754 30.4352C251.414 33.0423 249.555 36.1312 247.539 39.1263C246.919 40.0473 246.289 40.9516 245.661 41.8234C244.795 43.0254 243.589 43.7122 242.305 43.7786C203.091 45.8035 145.901 46 138.771 46C128.564 46 31.4023 44.8203 17.8486 42.4898C7.64084 40.7347 4.5 30.2041 4.5 23.1837C4.5 13.5306 11.5669 9.14284 20.9895 7.38774C29.0758 5.88153 80.6655 3 142.697 3C156.121 3.51032 173.142 3.86848 187.302 4.16645L187.302 4.16645C193.012 4.28662 198.258 4.397 202.614 4.50361C219.083 4.90666 227.923 5.25601 239.428 5.87755C240.574 5.93947 241.672 6.49634 242.521 7.4721C244.384 9.61314 246.345 11.9826 248.151 14.3483C250.093 16.8923 251.799 19.3604 253.003 21.4896C254.295 23.7719 254.689 25.1239 254.694 25.6358ZM61.7133 8.42107C83.3334 7.51418 111.689 6.79481 142.652 6.79412C156.091 7.30434 173.127 7.66285 187.278 7.96063L187.278 7.96063C192.981 8.08064 198.215 8.19079 202.556 8.29702C219.007 8.69962 227.823 9.04818 239.3 9.66821C239.764 9.69331 240.189 9.918 240.503 10.2799C242.33 12.3791 244.242 14.6903 245.993 16.9833C247.888 19.4662 249.481 21.7833 250.564 23.6973C251.03 24.5218 251.331 25.1509 251.517 25.5941C251.252 26.2817 250.831 27.2145 250.238 28.3676C248.987 30.8032 247.211 33.7599 245.254 36.667C244.656 37.5563 244.049 38.4285 243.444 39.2679C243.138 39.6929 242.696 39.961 242.182 39.9876C203.036 42.009 145.901 42.2059 138.771 42.2059C133.692 42.2059 106.87 41.9114 79.6157 41.3253C65.991 41.0323 52.2722 40.6667 41.1183 40.2291C29.8786 39.7883 21.4495 39.2799 18.2528 38.7303C13.9911 37.9975 11.3938 35.5119 9.8053 32.6376C8.15559 29.6526 7.5 26.0583 7.5 23.1837C7.5 19.7853 8.65566 17.3829 10.8939 15.4651C13.2894 13.4126 16.8889 11.9866 21.4266 11.1414C25.2623 10.4269 39.9816 9.33265 61.7133 8.42107ZM260.579 20.2754C259.996 18.7172 259.243 17.2493 258.531 15.9912C257.588 14.3247 256.464 12.5934 255.256 10.8751C255.92 10.9192 256.539 10.9641 257.08 11.0098C257.082 11.0116 257.084 11.0137 257.087 11.0162C257.09 11.0189 257.093 11.022 257.096 11.0256C257.647 11.6132 258.207 12.1974 258.764 12.7777C260.358 14.4389 261.921 16.0683 263.133 17.6527C264.834 19.8767 265.608 21.208 266.679 23.2132C267.12 24.039 267.423 24.8603 267.611 25.5336C267.749 26.0285 267.797 26.343 267.814 26.4619C267.797 26.5489 267.756 26.7367 267.659 27.0398C267.481 27.5939 267.165 28.3749 266.647 29.3846C265.646 31.3397 264.168 33.6211 262.405 35.9897C261.84 36.7485 261.257 37.5007 260.666 38.2379C260.377 38.5986 259.984 38.8197 259.554 38.8459C258.66 38.9004 257.645 38.9537 256.594 39.0063C257.278 37.8259 257.915 36.6665 258.486 35.5556C259.27 34.0295 259.988 32.4809 260.53 31.0255C260.989 29.7928 261.651 27.791 261.651 25.6458C261.651 23.6625 261.151 21.8053 260.579 20.2754ZM264.589 38.5907C266.421 36.1294 268.03 33.6638 269.165 31.4477C270.348 29.1387 270.823 27.4689 270.823 26.4872C270.823 25.5503 270.356 23.3184 269.165 21.0893C268.023 18.9507 267.141 17.4357 265.289 15.0147C263.948 13.262 262.188 11.4278 260.559 9.72967C260.029 9.17829 259.514 8.64125 259.031 8.12599C258.546 7.60767 257.949 7.28113 257.315 7.22712C255.955 7.11122 254.102 7.00111 252.308 6.89631L252.21 6.89058L251.987 6.87759L251.496 6.84894C251.17 6.82989 250.85 6.81102 250.537 6.79232C249.607 6.73672 249.102 8.19319 249.758 9.02919C249.98 9.3135 250.202 9.59837 250.421 9.88346C250.524 10.0167 250.626 10.15 250.728 10.2833C250.792 10.3667 250.855 10.4502 250.918 10.5337L250.982 10.617C252.922 13.1783 254.733 15.7973 256.091 18.1989C257.414 20.5368 258.651 23.2416 258.651 25.6458C258.651 26.901 258.245 28.2571 257.816 29.4093C257.353 30.6525 256.713 32.0427 255.97 33.488C255.051 35.2764 253.936 37.2246 252.717 39.198L252.698 39.2293C252.595 39.3947 252.492 39.5602 252.389 39.7259C252.149 40.1086 251.906 40.4917 251.66 40.8744C251.105 41.7372 251.617 43.0523 252.495 43.0067C252.624 43 252.754 42.9933 252.886 42.9866C253.144 42.9734 253.407 42.9602 253.675 42.947L254.175 42.9223L254.21 42.9205L254.999 42.8819L255 42.8819C256.638 42.8018 258.318 42.7198 259.698 42.6356C260.854 42.5652 261.949 41.9666 262.773 40.9392C263.388 40.1716 263.997 39.3859 264.589 38.5907ZM274.889 20.7727C274.371 19.3036 273.701 17.9196 273.068 16.7334C272.229 15.1621 271.229 13.5298 270.155 11.9097C270.745 11.9513 271.296 11.9936 271.777 12.0367C271.781 12.0402 271.786 12.0451 271.791 12.0516C272.281 12.6051 272.779 13.1554 273.273 13.7021L273.275 13.7036C274.692 15.2698 276.082 16.806 277.16 18.2999C278.673 20.3968 279.362 21.6521 280.314 23.5426C280.707 24.3212 280.976 25.0956 281.143 25.7304C281.266 26.197 281.309 26.4935 281.324 26.6056C281.309 26.6876 281.272 26.8647 281.186 27.1505C281.027 27.6729 280.746 28.4093 280.286 29.3613C279.395 31.2046 278.081 33.3556 276.513 35.5889C276.01 36.3043 275.492 37.0135 274.966 37.7085C274.709 38.0486 274.36 38.2571 273.977 38.2818C273.182 38.3332 272.279 38.3835 271.345 38.4331C271.953 37.3201 272.519 36.227 273.027 35.1796C273.724 33.7407 274.364 32.2806 274.845 30.9084C275.254 29.7461 275.842 27.8588 275.842 25.8362C275.842 23.9663 275.398 22.2152 274.889 20.7727ZM278.455 38.0412C280.085 35.7206 281.516 33.3959 282.525 31.3065C283.577 29.1295 284 27.5551 284 26.6294C284 25.7461 283.584 23.6418 282.525 21.5401C281.509 19.5238 280.725 18.0953 279.078 15.8127C277.886 14.1602 276.32 12.4309 274.871 10.8297C274.4 10.3099 273.942 9.80353 273.512 9.31772C273.08 8.82903 272.55 8.52115 271.986 8.47022C270.776 8.36095 269.128 8.25713 267.532 8.15833L267.445 8.15293L267.247 8.14067L266.81 8.11366C266.521 8.0957 266.235 8.07791 265.957 8.06028C265.13 8.00785 264.681 9.38108 265.264 10.1693C265.462 10.4374 265.659 10.7059 265.855 10.9747C265.901 11.0393 265.948 11.1039 265.995 11.1685C266.039 11.2296 266.083 11.2907 266.127 11.3518C266.184 11.4304 266.24 11.5091 266.297 11.5878L266.353 11.6663C268.078 14.0813 269.689 16.5505 270.898 18.8149C272.074 21.0192 273.174 23.5694 273.174 25.8362C273.174 27.0196 272.813 28.2982 272.431 29.3846C272.02 30.5567 271.45 31.8675 270.79 33.2301C269.972 34.9163 268.981 36.7532 267.896 38.6138L267.879 38.6433C267.788 38.7992 267.697 38.9553 267.604 39.1115C267.391 39.4723 267.175 39.8336 266.956 40.1944C266.463 41.0078 266.918 42.2478 267.699 42.2048C268.038 42.1861 268.389 42.1674 268.748 42.1485L269.193 42.1252L269.224 42.1236L269.926 42.0871L269.927 42.0871C271.384 42.0116 272.878 41.9343 274.106 41.8549C275.133 41.7885 276.107 41.2242 276.84 40.2554C277.387 39.5318 277.929 38.791 278.455 38.0412Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M250.694 22.6358L250.694 22.6408C250.691 22.6646 250.679 22.7751 250.626 22.9928C250.56 23.2671 250.448 23.6293 250.279 24.0832C249.94 24.9937 249.425 26.1288 248.754 27.4352C247.414 30.0423 245.555 33.1312 243.539 36.1263C242.919 37.0473 242.289 37.9516 241.661 38.8234C240.795 40.0254 239.589 40.7122 238.305 40.7786C199.091 42.8035 141.901 43 134.771 43C124.564 43 27.4023 41.8203 13.8486 39.4898C3.64084 37.7347 0.5 27.2041 0.5 20.1837C0.5 10.5306 7.56693 6.14284 16.9895 4.38774C25.0758 2.88153 76.6655 0 138.697 0C152.121 0.510323 169.142 0.868483 183.302 1.16645L183.302 1.16645C189.012 1.28662 194.258 1.397 198.614 1.50361C215.083 1.90666 223.923 2.25601 235.428 2.87755C236.574 2.93947 237.672 3.49634 238.521 4.4721C240.384 6.61314 242.345 8.98264 244.151 11.3483C246.093 13.8923 247.799 16.3604 249.003 18.4896C250.295 20.7719 250.689 22.1239 250.694 22.6358ZM57.7133 5.42107C79.3334 4.51418 107.689 3.79481 138.652 3.79412C152.091 4.30434 169.127 4.66285 183.278 4.96063L183.278 4.96063C188.981 5.08064 194.215 5.19079 198.556 5.29702C215.007 5.69962 223.823 6.04818 235.3 6.66821C235.764 6.69331 236.189 6.918 236.503 7.27988C238.33 9.37908 240.242 11.6903 241.993 13.9833C243.888 16.4662 245.481 18.7833 246.564 20.6973C247.03 21.5218 247.331 22.1509 247.517 22.5941C247.252 23.2817 246.831 24.2145 246.238 25.3676C244.987 27.8032 243.211 30.7599 241.254 33.667C240.656 34.5563 240.049 35.4285 239.444 36.2679C239.138 36.6929 238.696 36.961 238.182 36.9876C199.036 39.009 141.901 39.2059 134.771 39.2059C129.692 39.2059 102.87 38.9114 75.6157 38.3253C61.991 38.0323 48.2722 37.6667 37.1183 37.2291C25.8786 36.7883 17.4495 36.2799 14.2528 35.7303C9.99105 34.9975 7.39377 32.5119 5.8053 29.6376C4.15559 26.6526 3.5 23.0583 3.5 20.1837C3.5 16.7853 4.65566 14.3829 6.89395 12.4651C9.28938 10.4126 12.8889 8.98658 17.4266 8.14136C21.2623 7.42691 35.9816 6.33265 57.7133 5.42107ZM256.579 17.2754C255.996 15.7172 255.243 14.2493 254.531 12.9912C253.588 11.3247 252.464 9.59341 251.256 7.87508C251.92 7.91919 252.539 7.96405 253.08 8.00981C253.082 8.01159 253.084 8.0137 253.087 8.01618C253.09 8.01888 253.093 8.02201 253.096 8.02563C253.647 8.61316 254.207 9.19737 254.764 9.77769C256.358 11.4389 257.921 13.0683 259.133 14.6527C260.834 16.8767 261.608 18.208 262.679 20.2132C263.12 21.039 263.423 21.8603 263.611 22.5336C263.749 23.0285 263.797 23.343 263.814 23.4619C263.797 23.5489 263.756 23.7367 263.659 24.0398C263.481 24.5939 263.165 25.3749 262.647 26.3846C261.646 28.3397 260.168 30.6211 258.405 32.9897C257.84 33.7485 257.257 34.5007 256.666 35.2379C256.377 35.5986 255.984 35.8197 255.554 35.8459C254.66 35.9004 253.645 35.9537 252.594 36.0063C253.278 34.8259 253.915 33.6665 254.486 32.5556C255.27 31.0295 255.988 29.4809 256.53 28.0255C256.989 26.7928 257.651 24.791 257.651 22.6458C257.651 20.6625 257.151 18.8053 256.579 17.2754ZM260.589 35.5907C262.421 33.1294 264.03 30.6638 265.165 28.4477C266.348 26.1387 266.823 24.4689 266.823 23.4872C266.823 22.5503 266.356 20.3184 265.165 18.0893C264.023 15.9507 263.141 14.4357 261.289 12.0147C259.948 10.262 258.188 8.42784 256.559 6.72967C256.029 6.17829 255.514 5.64125 255.031 5.12599C254.546 4.60767 253.949 4.28113 253.315 4.22712C251.955 4.11122 250.102 4.00111 248.308 3.89631L248.21 3.89058L247.987 3.87759L247.496 3.84894C247.17 3.82989 246.85 3.81102 246.537 3.79232C245.607 3.73672 245.102 5.19319 245.758 6.02919C245.98 6.3135 246.202 6.59837 246.421 6.88346C246.524 7.01671 246.626 7.15002 246.728 7.28333C246.792 7.36671 246.855 7.45016 246.918 7.53368L246.982 7.61697C248.922 10.1783 250.733 12.7973 252.091 15.1989C253.414 17.5368 254.651 20.2416 254.651 22.6458C254.651 23.901 254.245 25.2571 253.816 26.4093C253.353 27.6525 252.713 29.0427 251.97 30.488C251.051 32.2764 249.936 34.2246 248.717 36.198L248.698 36.2293C248.595 36.3947 248.492 36.5602 248.389 36.7259C248.149 37.1086 247.906 37.4917 247.66 37.8744C247.105 38.7372 247.617 40.0523 248.495 40.0067C248.624 40 248.754 39.9933 248.886 39.9866C249.144 39.9734 249.407 39.9602 249.675 39.947L250.175 39.9223L250.21 39.9205L250.999 39.8819L251 39.8819C252.638 39.8018 254.318 39.7198 255.698 39.6356C256.854 39.5652 257.949 38.9666 258.773 37.9392C259.388 37.1716 259.997 36.3859 260.589 35.5907ZM270.889 17.7727C270.371 16.3036 269.701 14.9196 269.068 13.7334C268.229 12.1621 267.229 10.5298 266.155 8.90969C266.745 8.95128 267.296 8.99358 267.777 9.03671C267.781 9.04021 267.786 9.04507 267.791 9.05163C268.281 9.60508 268.779 10.1554 269.273 10.7021L269.275 10.7036C270.692 12.2698 272.082 13.806 273.16 15.2999C274.673 17.3968 275.362 18.6521 276.314 20.5426C276.707 21.3212 276.976 22.0956 277.143 22.7304C277.266 23.197 277.309 23.4935 277.324 23.6056C277.309 23.6876 277.272 23.8647 277.186 24.1505C277.027 24.6729 276.746 25.4093 276.286 26.3613C275.395 28.2046 274.081 30.3556 272.513 32.5889C272.01 33.3043 271.492 34.0135 270.966 34.7085C270.709 35.0486 270.36 35.2571 269.977 35.2818C269.182 35.3332 268.279 35.3835 267.345 35.4331C267.953 34.3201 268.519 33.227 269.027 32.1796C269.724 30.7407 270.364 29.2806 270.845 27.9084C271.254 26.7461 271.842 24.8588 271.842 22.8362C271.842 20.9663 271.398 19.2152 270.889 17.7727ZM274.455 35.0412C276.085 32.7206 277.516 30.3959 278.525 28.3065C279.577 26.1295 280 24.5551 280 23.6294C280 22.7461 279.584 20.6418 278.525 18.5401C277.509 16.5238 276.725 15.0953 275.078 12.8127C273.886 11.1602 272.32 9.43085 270.871 7.82974C270.4 7.30988 269.942 6.80353 269.512 6.31772C269.08 5.82903 268.55 5.52115 267.986 5.47022C266.776 5.36095 265.128 5.25713 263.532 5.15833L263.445 5.15293L263.247 5.14067L262.81 5.11366C262.521 5.0957 262.235 5.07791 261.957 5.06028C261.13 5.00785 260.681 6.38108 261.264 7.1693C261.462 7.43736 261.659 7.70595 261.855 7.97474C261.901 8.03932 261.948 8.10391 261.995 8.1685C262.039 8.22958 262.083 8.29067 262.127 8.35176C262.184 8.43037 262.24 8.50905 262.297 8.5878L262.353 8.66633C264.078 11.0813 265.689 13.5505 266.898 15.8149C268.074 18.0192 269.174 20.5694 269.174 22.8362C269.174 24.0196 268.813 25.2982 268.431 26.3846C268.02 27.5567 267.45 28.8675 266.79 30.2301C265.972 31.9163 264.981 33.7532 263.896 35.6138L263.879 35.6433C263.788 35.7992 263.697 35.9553 263.604 36.1115C263.391 36.4723 263.175 36.8336 262.956 37.1944C262.463 38.0078 262.918 39.2478 263.699 39.2048C264.038 39.1861 264.389 39.1674 264.748 39.1485L265.193 39.1252L265.224 39.1236L265.926 39.0871L265.927 39.0871C267.384 39.0116 268.878 38.9343 270.106 38.8549C271.133 38.7885 272.107 38.2242 272.84 37.2554C273.387 36.5318 273.929 35.791 274.455 35.0412Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

const BackgroundShapeWide = ({ color = "#2A4059" }) => {
  return (
    <div className={styles.svgContainer}>
      <svg
        width="396"
        height="46"
        viewBox="0 0 396 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <mask id="path-1-inside-1" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M355.117 25.6358L355.116 25.6408C355.112 25.6646 355.096 25.7751 355.022 25.9928C354.929 26.2671 354.773 26.6293 354.537 27.0832C354.065 27.9937 353.346 29.1288 352.41 30.4352C350.541 33.0423 347.947 36.1312 345.134 39.1263C344.27 40.0473 343.392 40.9516 342.515 41.8234C341.307 43.0254 339.625 43.7122 337.832 43.7786C283.126 45.8035 203.343 46 193.397 46C179.157 46 43.6107 44.8203 24.7025 42.4898C10.462 40.7347 6.08032 30.2041 6.08032 23.1837C6.08032 13.5306 15.9391 9.14284 29.0842 7.38774C40.3651 5.88153 112.336 3 198.874 3C217.601 3.51032 241.346 3.86848 261.1 4.16645L261.1 4.16645C269.067 4.28662 276.384 4.39699 282.462 4.50361C305.437 4.90666 317.77 5.25601 333.819 5.87755C335.418 5.93947 336.95 6.49634 338.134 7.4721C340.733 9.61314 343.47 11.9826 345.989 14.3483C348.697 16.8923 351.077 19.3604 352.758 21.4896C354.559 23.7719 355.11 25.1239 355.117 25.6358ZM85.8964 8.42107C116.058 7.51418 155.615 6.79481 198.811 6.79412C217.559 7.30434 241.326 7.66285 261.067 7.96063L261.067 7.96063L261.068 7.96064C269.023 8.08065 276.325 8.19079 282.381 8.29702C305.33 8.69962 317.63 9.04818 333.64 9.66821C334.289 9.69331 334.88 9.918 335.32 10.2799C337.867 12.3791 340.536 14.6903 342.977 16.9833C345.621 19.4662 347.844 21.7833 349.354 23.6973C350.005 24.5218 350.425 25.1509 350.684 25.5941C350.315 26.2817 349.727 27.2145 348.9 28.3676C347.154 30.8032 344.677 33.7599 341.948 36.667C341.113 37.5563 340.266 38.4285 339.422 39.2679C338.994 39.6929 338.379 39.961 337.662 39.9876C283.05 42.009 203.343 42.2059 193.397 42.2059C186.312 42.2059 148.892 41.9114 110.871 41.3253C91.864 41.0323 72.7254 40.6667 57.1651 40.2291C41.485 39.7883 29.7259 39.2799 25.2663 38.7303C19.3209 37.9975 15.6976 35.5119 13.4815 32.6376C11.1801 29.6526 10.2655 26.0583 10.2655 23.1837C10.2655 19.7853 11.8777 17.3829 15.0003 15.4651C18.3421 13.4126 23.3636 11.9866 29.694 11.1414C35.045 10.4269 55.5793 9.33265 85.8964 8.42107ZM363.326 20.2754C362.514 18.7172 361.462 17.2493 360.47 15.9912C359.154 14.3247 357.586 12.5934 355.9 10.8751C356.827 10.9192 357.691 10.9641 358.445 11.0098C358.451 11.0135 358.459 11.0187 358.468 11.0256C359.236 11.6132 360.018 12.1974 360.794 12.7777L360.795 12.7778C363.018 14.439 365.198 16.0683 366.889 17.6527C369.262 19.8767 370.342 21.208 371.836 23.2132C372.452 24.039 372.875 24.8603 373.136 25.5336C373.329 26.0285 373.396 26.343 373.42 26.4619C373.396 26.5489 373.339 26.7367 373.203 27.0398C372.954 27.5939 372.514 28.3749 371.792 29.3846C370.395 31.3397 368.334 33.6211 365.873 35.9897C365.085 36.7485 364.272 37.5007 363.448 38.2379C363.044 38.5986 362.496 38.8197 361.896 38.8459C360.65 38.9004 359.233 38.9537 357.768 39.0063C358.721 37.8259 359.609 36.6665 360.406 35.5556C361.5 34.0295 362.502 32.4809 363.258 31.0255C363.899 29.7928 364.822 27.791 364.822 25.6458C364.822 23.6625 364.124 21.8053 363.326 20.2754ZM368.92 38.5907C371.477 36.1294 373.72 33.6638 375.304 31.4477C376.955 29.1387 377.617 27.4689 377.617 26.4872C377.617 25.5503 376.965 23.3184 375.304 21.0893C373.711 18.9507 372.48 17.4357 369.897 15.0147C368.027 13.262 365.571 11.4278 363.298 9.72967C362.56 9.17829 361.841 8.64125 361.167 8.12599C360.49 7.60767 359.658 7.28113 358.773 7.22712C356.875 7.11122 354.291 7.00111 351.788 6.89631L351.651 6.89058L351.34 6.87759L350.655 6.84894C350.201 6.82989 349.753 6.81102 349.317 6.79232C348.02 6.73672 347.315 8.19319 348.23 9.02919C348.541 9.3135 348.85 9.59837 349.156 9.88346C349.299 10.0167 349.442 10.15 349.583 10.2833C349.672 10.3667 349.761 10.4502 349.849 10.5337L349.937 10.617C352.644 13.1783 355.17 15.7973 357.066 18.1989C358.911 20.5368 360.636 23.2416 360.636 25.6458C360.636 26.901 360.07 28.2571 359.472 29.4093C358.826 30.6525 357.933 32.0427 356.897 33.488C355.615 35.2764 354.06 37.2246 352.358 39.198L352.331 39.2293C352.189 39.3947 352.045 39.5602 351.9 39.7259C351.566 40.1086 351.227 40.4917 350.884 40.8744C350.109 41.7372 350.823 43.0523 352.049 43.0067C352.58 42.9869 353.131 42.967 353.694 42.947L354.393 42.9223L354.441 42.9205L355.543 42.8819L355.544 42.8819C357.829 42.8018 360.172 42.7198 362.098 42.6356C363.71 42.5652 365.238 41.9666 366.387 40.9392C367.245 40.1716 368.094 39.3859 368.92 38.5907ZM383.29 20.7727C382.567 19.3036 381.632 17.9196 380.749 16.7334C379.579 15.1621 378.184 13.5298 376.685 11.9097C377.509 11.9513 378.277 11.9936 378.948 12.0367C378.953 12.0402 378.96 12.0451 378.968 12.0516C379.651 12.6052 380.346 13.1555 381.036 13.7023L381.038 13.7036C383.015 15.2698 384.955 16.8061 386.458 18.2999C388.569 20.3968 389.529 21.6521 390.858 23.5426C391.406 24.3212 391.782 25.0956 392.015 25.7304C392.186 26.197 392.246 26.4935 392.267 26.6056C392.246 26.6877 392.195 26.8648 392.074 27.1505C391.853 27.6729 391.461 28.4093 390.819 29.3613C389.576 31.2047 387.743 33.3556 385.555 35.5889C384.854 36.3043 384.131 37.0135 383.398 37.7086C383.039 38.0486 382.551 38.2571 382.017 38.2818C380.909 38.3332 379.649 38.3835 378.345 38.4331C379.193 37.3201 379.984 36.227 380.692 35.1796C381.665 33.7407 382.557 32.2807 383.229 30.9084C383.798 29.7462 384.619 27.8588 384.619 25.8362C384.619 23.9663 383.999 22.2152 383.29 20.7727ZM388.265 38.0413C390.539 35.7206 392.534 33.3959 393.943 31.3065C395.411 29.1295 396 27.5551 396 26.6295C396 25.7462 395.42 23.6418 393.943 21.5401C392.525 19.5238 391.431 18.0953 389.134 15.8127C387.47 14.1602 385.286 12.4309 383.264 10.8298C382.608 10.3099 381.968 9.80355 381.369 9.31774C380.766 8.82904 380.027 8.52116 379.24 8.47024C377.552 8.36096 375.253 8.25715 373.027 8.15834L372.905 8.15294L372.628 8.14069L372.02 8.11368C371.615 8.09572 371.217 8.07792 370.829 8.0603C369.676 8.00787 369.049 9.38109 369.862 10.1693C370.139 10.4374 370.414 10.706 370.686 10.9748C370.813 11.1004 370.94 11.2261 371.066 11.3518C371.145 11.4304 371.224 11.5091 371.303 11.5878L371.381 11.6663C373.788 14.0813 376.035 16.5506 377.721 18.8149C379.362 21.0192 380.897 23.5694 380.897 25.8362C380.897 27.0196 380.393 28.2982 379.861 29.3846C379.287 30.5567 378.492 31.8675 377.571 33.2302C376.43 34.9163 375.047 36.7532 373.534 38.6138L373.51 38.6433C373.384 38.7993 373.256 38.9554 373.127 39.1115C372.83 39.4723 372.528 39.8336 372.223 40.1944C371.534 41.0079 372.169 42.2478 373.259 42.2048C373.732 42.1862 374.222 42.1674 374.723 42.1485L375.344 42.1252L375.387 42.1236L376.366 42.0872C378.399 42.0117 380.484 41.9343 382.197 41.8549C383.63 41.7885 384.989 41.2242 386.012 40.2554C386.775 39.5318 387.53 38.791 388.265 38.0413Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M349.536 22.6358L349.535 22.6408C349.532 22.6646 349.516 22.7751 349.442 22.9928C349.349 23.2671 349.193 23.6293 348.957 24.0832C348.484 24.9937 347.766 26.1288 346.829 27.4352C344.96 30.0423 342.367 33.1312 339.554 36.1263C338.689 37.0473 337.811 37.9516 336.935 38.8234C335.727 40.0254 334.044 40.7122 332.252 40.7786C277.546 42.8035 197.762 43 187.817 43C173.576 43 38.0304 41.8203 19.1221 39.4898C4.88166 37.7347 0.5 27.2041 0.5 20.1837C0.5 10.5306 10.3588 6.14284 23.5038 4.38774C34.7847 2.88153 106.756 0 193.294 0C212.021 0.510323 235.766 0.868483 255.52 1.16645L255.52 1.16645C263.486 1.28662 270.804 1.39699 276.881 1.50361C299.857 1.90666 312.189 2.25601 328.239 2.87755C329.838 2.93947 331.37 3.49634 332.554 4.4721C335.153 6.61314 337.889 8.98264 340.408 11.3483C343.117 13.8923 345.497 16.3604 347.178 18.4896C348.979 20.7719 349.529 22.1239 349.536 22.6358ZM80.3161 5.42107C110.478 4.51418 150.035 3.79481 193.231 3.79412C211.978 4.30434 235.746 4.66285 255.486 4.96063L255.487 4.96063L255.487 4.96064C263.443 5.08065 270.745 5.19079 276.8 5.29702C299.75 5.69962 312.049 6.04818 328.06 6.66821C328.708 6.69331 329.3 6.918 329.739 7.27988C332.287 9.37908 334.955 11.6903 337.397 13.9833C340.041 16.4662 342.263 18.7833 343.774 20.6973C344.425 21.5218 344.844 22.1509 345.103 22.5941C344.735 23.2817 344.147 24.2145 343.32 25.3676C341.574 27.8032 339.097 30.7599 336.367 33.667C335.532 34.5563 334.685 35.4285 333.841 36.2679C333.414 36.6929 332.799 36.961 332.081 36.9876C277.47 39.009 197.763 39.2059 187.817 39.2059C180.731 39.2059 143.312 38.9114 105.291 38.3253C86.2837 38.0323 67.1451 37.6667 51.5848 37.2291C35.9047 36.7883 24.1456 36.2799 19.6859 35.7303C13.7406 34.9975 10.1172 32.5119 7.90123 29.6376C5.59977 26.6526 4.68519 23.0583 4.68519 20.1837C4.68519 16.7853 6.2974 14.3829 9.41995 12.4651C12.7617 10.4126 17.7833 8.98658 24.1137 8.14136C29.4646 7.42691 49.999 6.33265 80.3161 5.42107ZM357.746 17.2754C356.933 15.7172 355.882 14.2493 354.889 12.9912C353.574 11.3247 352.006 9.59341 350.32 7.87508C351.246 7.91919 352.11 7.96405 352.865 8.00981C352.871 8.01352 352.879 8.01867 352.888 8.02563C353.656 8.61316 354.437 9.19737 355.214 9.77769C357.437 11.4389 359.618 13.0683 361.309 14.6527C363.682 16.8767 364.762 18.208 366.256 20.2132C366.871 21.039 367.294 21.8603 367.556 22.5336C367.748 23.0285 367.816 23.343 367.839 23.4619C367.816 23.5489 367.759 23.7367 367.623 24.0398C367.374 24.5939 366.933 25.3749 366.212 26.3846C364.814 28.3397 362.753 30.6211 360.293 32.9897C359.505 33.7485 358.692 34.5007 357.868 35.2379C357.464 35.5986 356.916 35.8197 356.316 35.8459C355.069 35.9004 353.653 35.9537 352.187 36.0063C353.141 34.8259 354.029 33.6665 354.825 32.5556C355.92 31.0295 356.922 29.4809 357.678 28.0255C358.318 26.7928 359.241 24.791 359.241 22.6458C359.241 20.6625 358.544 18.8053 357.746 17.2754ZM363.34 35.5907C365.897 33.1294 368.14 30.6638 369.724 28.4477C371.374 26.1387 372.037 24.4689 372.037 23.4872C372.037 22.5503 371.385 20.3184 369.724 18.0893C368.13 15.9507 366.9 14.4357 364.317 12.0147C362.447 10.262 359.991 8.42784 357.717 6.72967C356.979 6.17829 356.26 5.64125 355.587 5.12599C354.909 4.60767 354.077 4.28113 353.193 4.22712C351.295 4.11122 348.711 4.00111 346.207 3.89631L346.07 3.89058L345.759 3.87759L345.075 3.84894C344.62 3.82989 344.173 3.81102 343.737 3.79232C342.44 3.73672 341.735 5.19319 342.649 6.02919C342.96 6.3135 343.269 6.59837 343.575 6.88346C343.719 7.01671 343.861 7.15002 344.003 7.28333C344.092 7.36671 344.181 7.45016 344.269 7.53368L344.357 7.61697C347.064 10.1783 349.59 12.7973 351.486 15.1989C353.331 17.5368 355.056 20.2416 355.056 22.6458C355.056 23.901 354.49 25.2571 353.892 26.4093C353.246 27.6525 352.353 29.0427 351.316 30.488C350.034 32.2764 348.479 34.2246 346.778 36.198L346.751 36.2293C346.608 36.3947 346.465 36.5602 346.32 36.7259C345.986 37.1086 345.647 37.4917 345.303 37.8744C344.529 38.7372 345.243 40.0523 346.469 40.0067C347 39.9869 347.551 39.967 348.114 39.947L348.812 39.9223L348.861 39.9205L349.962 39.8819L349.964 39.8819C352.249 39.8018 354.592 39.7198 356.517 39.6356C358.129 39.5652 359.657 38.9666 360.806 37.9392C361.665 37.1716 362.514 36.3859 363.34 35.5907ZM377.709 17.7727C376.986 16.3036 376.052 14.9196 375.168 13.7334C373.999 12.1621 372.604 10.5298 371.105 8.9097C371.929 8.95129 372.697 8.99359 373.368 9.03673C373.373 9.04023 373.38 9.04509 373.388 9.05164C374.071 9.60516 374.766 10.1555 375.456 10.7023L375.457 10.7036C377.435 12.2698 379.374 13.8061 380.878 15.2999C382.989 17.3968 383.949 18.6521 385.278 20.5426C385.825 21.3212 386.202 22.0956 386.434 22.7304C386.606 23.197 386.665 23.4935 386.686 23.6056C386.666 23.6877 386.615 23.8648 386.494 24.1505C386.273 24.6729 385.881 25.4093 385.239 26.3613C383.996 28.2047 382.163 30.3556 379.975 32.5889C379.274 33.3043 378.551 34.0135 377.817 34.7086C377.459 35.0486 376.971 35.2571 376.437 35.2818C375.329 35.3332 374.069 35.3835 372.765 35.4331C373.613 34.3201 374.403 33.227 375.112 32.1796C376.085 30.7407 376.977 29.2807 377.649 27.9084C378.218 26.7462 379.039 24.8588 379.039 22.8362C379.039 20.9663 378.419 19.2152 377.709 17.7727ZM382.685 35.0413C384.958 32.7206 386.954 30.3959 388.363 28.3065C389.83 26.1295 390.42 24.5551 390.42 23.6295C390.42 22.7462 389.84 20.6418 388.363 18.5401C386.945 16.5238 385.851 15.0953 383.553 12.8127C381.89 11.1602 379.706 9.43086 377.684 7.82976C377.027 7.30989 376.388 6.80355 375.789 6.31774C375.186 5.82904 374.446 5.52116 373.66 5.47024C371.972 5.36096 369.673 5.25715 367.447 5.15834L367.325 5.15294L367.048 5.14069L366.439 5.11368C366.035 5.09572 365.637 5.07792 365.249 5.0603C364.096 5.00787 363.469 6.38109 364.282 7.16931C364.559 7.43737 364.833 7.70596 365.106 7.97476C365.233 8.1004 365.36 8.22608 365.486 8.35177C365.565 8.43038 365.644 8.50907 365.723 8.58781L365.801 8.66634C368.208 11.0813 370.455 13.5506 372.141 15.8149C373.782 18.0192 375.317 20.5694 375.317 22.8362C375.317 24.0196 374.813 25.2982 374.281 26.3846C373.707 27.5567 372.912 28.8675 371.991 30.2302C370.85 31.9163 369.467 33.7532 367.954 35.6138L367.93 35.6433C367.803 35.7993 367.676 35.9554 367.547 36.1115C367.25 36.4723 366.948 36.8336 366.643 37.1944C365.954 38.0079 366.589 39.2478 367.679 39.2048C368.151 39.1862 368.642 39.1674 369.142 39.1485L369.763 39.1252L369.807 39.1236L370.786 39.0872C372.819 39.0117 374.904 38.9343 376.617 38.8549C378.05 38.7885 379.409 38.2242 380.431 37.2554C381.195 36.5318 381.95 35.791 382.685 35.0413Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

type SkipAheadProps = {
  mount?: any;
  scroll: any;
  applySkipAhead: any;
  windowWidth: number;
  scrollTo?: Function;
};

const SkipAhead: React.FC<SkipAheadProps> = ({
  mount,
  scroll,
  applySkipAhead,
  windowWidth,
  ...props
}) => {
  const rootEl = useRef(null);
  const { id } = mount;
  const config = a2o(id || "TOundefined");
  const { from, to } = config;
  const target = document.getElementById(to);

  const [useWideButtons, setUseWideButtons] = useState(false);

  function getQuestionKey(shortId: string) {
    switch (shortId) {
      case "renewables":
        return "SUBQ1-renewables-zero-carbon";
      case "agriculture":
        return "SUBQ2-livestock-emissions";
      case "transport":
        return "SUBQ3-transportation-off-fossil";
      case "industry":
        return "SUBQ4-industry-emissions";
    }

    return null;
  }

  function getColour(shortId: string) {
    switch (shortId) {
      case "renewables":
        return "#F65C1B";
      case "agriculture":
        return "#007B52";
      case "transport":
        return "#007cbf";
      case "industry":
        return "#2A4059";
    }

    return undefined;
  }

  useEffect(() => {
    const el: any = rootEl.current;
    const panelWidth: number = el.getBoundingClientRect().width;

    if (panelWidth > 400) setUseWideButtons(true);
    else setUseWideButtons(false);
  }, [windowWidth]);

  return (
    <div ref={rootEl} className={styles.root}>
      <div className={styles.backgroundContainer}>
        <button
          className={styles.button}
          onClick={() => {
            applySkipAhead(getQuestionKey(from));

            // If this timeout doesn't always work
            // try explicitly waiting until DOM modifications
            // from previous function
            setTimeout(() => {
              
              scroll.animateScroll(target);
            }, 200);
          }}
          style={{
            color: getColour(from)
          }}
        >
          {"Skip ahead"}
        </button>
        <div className={styles.organicBackground}>
          {useWideButtons ? (
            <BackgroundShapeWide color={getColour(from)} />
          ) : (
            <BackgroundShape color={getColour(from)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkipAhead;
