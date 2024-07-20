import React from "react";

function LongLogo({ className }: { className?: string }) {
  return (
    <svg
      width="308"
      height="49"
      viewBox="0 0 308 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.3466 40.4513C10.1821 40.4513 8.31842 39.9612 6.75568 38.9808C5.20265 37.9908 4.00876 36.627 3.17401 34.8896C2.33925 33.1521 1.92188 31.1623 1.92188 28.9201C1.92188 26.6488 2.34896 24.6444 3.20312 22.907C4.05729 21.1598 5.26089 19.796 6.81392 18.8157C8.36695 17.8353 10.1966 17.3452 12.3029 17.3452C14.0015 17.3452 15.5157 17.6606 16.8455 18.2915C18.1753 18.9128 19.2479 19.7863 20.0632 20.9123C20.8883 22.0382 21.3784 23.3535 21.5337 24.858H17.2969C17.0639 23.8097 16.5301 22.907 15.6953 22.1499C14.8703 21.3928 13.7637 21.0142 12.3757 21.0142C11.1624 21.0142 10.0996 21.3345 9.18715 21.9751C8.28445 22.6061 7.58073 23.5088 7.07599 24.6832C6.57126 25.848 6.31889 27.2263 6.31889 28.8182C6.31889 30.4489 6.56641 31.8563 7.06144 33.0405C7.55646 34.2247 8.25533 35.1419 9.15803 35.7923C10.0704 36.4426 11.143 36.7678 12.3757 36.7678C13.2008 36.7678 13.9482 36.6173 14.6179 36.3164C15.2973 36.0058 15.8652 35.5642 16.3214 34.9915C16.7873 34.4188 17.1125 33.7296 17.2969 32.924H21.5337C21.3784 34.3703 20.9077 35.6612 20.1214 36.7969C19.3352 37.9325 18.2821 38.8255 16.962 39.4759C15.6516 40.1262 14.1132 40.4513 12.3466 40.4513ZM69.3841 17.6364V21.1307H56.7463V17.6364H69.3841ZM60.2115 40V15.0447C60.2115 13.647 60.5172 12.4871 61.1287 11.565C61.7402 10.6332 62.5507 9.93916 63.5602 9.48295C64.5697 9.01704 65.6665 8.78409 66.8507 8.78409C67.7243 8.78409 68.4717 8.85689 69.0929 9.00249C69.7141 9.13837 70.1751 9.26456 70.476 9.38104L69.4569 12.9045C69.253 12.8462 68.9909 12.7783 68.6706 12.7006C68.3503 12.6133 67.9621 12.5696 67.5059 12.5696C66.4479 12.5696 65.6908 12.8317 65.2346 13.3558C64.7881 13.88 64.5648 14.6371 64.5648 15.6271V40H60.2115ZM84.5188 17.6364V21.1307H71.881V17.6364H84.5188ZM75.3462 40V15.0447C75.3462 13.647 75.652 12.4871 76.2635 11.565C76.875 10.6332 77.6855 9.93916 78.695 9.48295C79.7044 9.01704 80.8013 8.78409 81.9854 8.78409C82.859 8.78409 83.6064 8.85689 84.2276 9.00249C84.8488 9.13837 85.3099 9.26456 85.6108 9.38104L84.5916 12.9045C84.3878 12.8462 84.1257 12.7783 83.8054 12.7006C83.4851 12.6133 83.0968 12.5696 82.6406 12.5696C81.5826 12.5696 80.8255 12.8317 80.3693 13.3558C79.9228 13.88 79.6996 14.6371 79.6996 15.6271V40H75.3462ZM97.7681 40.4513C95.5647 40.4513 93.6671 39.9806 92.0753 39.0391C90.4931 38.0878 89.2701 36.7532 88.4062 35.0352C87.5521 33.3074 87.125 31.2836 87.125 28.9638C87.125 26.6731 87.5521 24.6541 88.4062 22.907C89.2701 21.1598 90.4737 19.796 92.017 18.8157C93.5701 17.8353 95.3852 17.3452 97.4624 17.3452C98.7242 17.3452 99.9472 17.5539 101.131 17.9712C102.316 18.3886 103.378 19.0438 104.32 19.9368C105.261 20.8298 106.004 21.9897 106.548 23.4165C107.091 24.8337 107.363 26.5566 107.363 28.5852V30.1286H89.5856V26.8672H103.097C103.097 25.7218 102.864 24.7075 102.398 23.8242C101.932 22.9312 101.277 22.2275 100.433 21.7131C99.5978 21.1986 98.6174 20.9414 97.4915 20.9414C96.2685 20.9414 95.2008 21.2423 94.2884 21.8441C93.3857 22.4362 92.6868 23.2127 92.1918 24.1737C91.7064 25.1249 91.4638 26.1586 91.4638 27.2749V29.8228C91.4638 31.3176 91.7259 32.5891 92.25 33.6374C92.7839 34.6857 93.5264 35.4865 94.4776 36.0398C95.4289 36.5833 96.5402 36.8551 97.8118 36.8551C98.6368 36.8551 99.3891 36.7386 100.069 36.5057C100.748 36.263 101.335 35.9039 101.83 35.4283C102.325 34.9527 102.704 34.3654 102.966 33.6665L107.086 34.4091C106.756 35.6224 106.164 36.6853 105.31 37.5977C104.466 38.5004 103.403 39.2041 102.121 39.7088C100.85 40.2038 99.3988 40.4513 97.7681 40.4513ZM121.832 40.4513C119.628 40.4513 117.731 39.9806 116.139 39.0391C114.557 38.0878 113.334 36.7532 112.47 35.0352C111.616 33.3074 111.188 31.2836 111.188 28.9638C111.188 26.6731 111.616 24.6541 112.47 22.907C113.334 21.1598 114.537 19.796 116.081 18.8157C117.634 17.8353 119.449 17.3452 121.526 17.3452C122.788 17.3452 124.011 17.5539 125.195 17.9712C126.379 18.3886 127.442 19.0438 128.383 19.9368C129.325 20.8298 130.068 21.9897 130.611 23.4165C131.155 24.8337 131.426 26.5566 131.426 28.5852V30.1286H113.649V26.8672H127.16C127.16 25.7218 126.927 24.7075 126.462 23.8242C125.996 22.9312 125.34 22.2275 124.496 21.7131C123.661 21.1986 122.681 20.9414 121.555 20.9414C120.332 20.9414 119.264 21.2423 118.352 21.8441C117.449 22.4362 116.75 23.2127 116.255 24.1737C115.77 25.1249 115.527 26.1586 115.527 27.2749V29.8228C115.527 31.3176 115.789 32.5891 116.313 33.6374C116.847 34.6857 117.59 35.4865 118.541 36.0398C119.492 36.5833 120.604 36.8551 121.875 36.8551C122.7 36.8551 123.453 36.7386 124.132 36.5057C124.811 36.263 125.399 35.9039 125.894 35.4283C126.389 34.9527 126.767 34.3654 127.029 33.6665L131.15 34.4091C130.82 35.6224 130.228 36.6853 129.373 37.5977C128.529 38.5004 127.466 39.2041 126.185 39.7088C124.913 40.2038 123.462 40.4513 121.832 40.4513ZM156.527 40.4513C154.363 40.4513 152.499 39.9612 150.936 38.9808C149.383 37.9908 148.189 36.627 147.355 34.8896C146.52 33.1521 146.103 31.1623 146.103 28.9201C146.103 26.6488 146.53 24.6444 147.384 22.907C148.238 21.1598 149.442 19.796 150.995 18.8157C152.548 17.8353 154.377 17.3452 156.484 17.3452C158.182 17.3452 159.696 17.6606 161.026 18.2915C162.356 18.9128 163.429 19.7863 164.244 20.9123C165.069 22.0382 165.559 23.3535 165.714 24.858H161.478C161.245 23.8097 160.711 22.907 159.876 22.1499C159.051 21.3928 157.944 21.0142 156.556 21.0142C155.343 21.0142 154.28 21.3345 153.368 21.9751C152.465 22.6061 151.761 23.5088 151.257 24.6832C150.752 25.848 150.5 27.2263 150.5 28.8182C150.5 30.4489 150.747 31.8563 151.242 33.0405C151.737 34.2247 152.436 35.1419 153.339 35.7923C154.251 36.4426 155.324 36.7678 156.556 36.7678C157.381 36.7678 158.129 36.6173 158.799 36.3164C159.478 36.0058 160.046 35.5642 160.502 34.9915C160.968 34.4188 161.293 33.7296 161.478 32.924H165.714C165.559 34.3703 165.088 35.6612 164.302 36.7969C163.516 37.9325 162.463 38.8255 161.143 39.4759C159.832 40.1262 158.294 40.4513 156.527 40.4513ZM184.536 30.7255V17.6364H188.904V40H184.624V36.1271H184.391C183.876 37.321 183.051 38.3159 181.916 39.1119C180.79 39.8981 179.387 40.2912 177.708 40.2912C176.271 40.2912 175 39.9757 173.893 39.3448C172.796 38.7042 171.933 37.7578 171.302 36.5057C170.68 35.2536 170.37 33.7054 170.37 31.8612V17.6364H174.723V31.337C174.723 32.8609 175.145 34.0742 175.99 34.9769C176.834 35.8796 177.931 36.331 179.28 36.331C180.096 36.331 180.906 36.1271 181.712 35.7195C182.527 35.3118 183.202 34.6954 183.736 33.8704C184.279 33.0453 184.546 31.997 184.536 30.7255ZM199.107 10.1818V40H194.754V10.1818H199.107ZM215.403 17.6364V21.1307H203.187V17.6364H215.403ZM206.463 12.2784H210.817V33.4336C210.817 34.2781 210.943 34.9138 211.195 35.3409C211.448 35.7583 211.773 36.0446 212.171 36.1999C212.578 36.3455 213.02 36.4183 213.496 36.4183C213.845 36.4183 214.151 36.3941 214.413 36.3455C214.675 36.297 214.879 36.2582 215.024 36.229L215.811 39.8253C215.558 39.9223 215.199 40.0194 214.733 40.1165C214.267 40.2232 213.685 40.2815 212.986 40.2912C211.841 40.3106 210.773 40.1068 209.783 39.6797C208.793 39.2526 207.992 38.5926 207.381 37.6996C206.769 36.8066 206.463 35.6855 206.463 34.3363V12.2784ZM234.385 30.7255V17.6364H238.753V40H234.472V36.1271H234.239C233.725 37.321 232.9 38.3159 231.764 39.1119C230.638 39.8981 229.236 40.2912 227.557 40.2912C226.12 40.2912 224.848 39.9757 223.742 39.3448C222.645 38.7042 221.781 37.7578 221.15 36.5057C220.529 35.2536 220.218 33.7054 220.218 31.8612V17.6364H224.572V31.337C224.572 32.8609 224.994 34.0742 225.839 34.9769C226.683 35.8796 227.78 36.331 229.129 36.331C229.944 36.331 230.755 36.1271 231.56 35.7195C232.376 35.3118 233.05 34.6954 233.584 33.8704C234.128 33.0453 234.395 31.997 234.385 30.7255ZM244.602 40V17.6364H248.81V21.1889H249.043C249.451 19.9853 250.169 19.0389 251.198 18.3498C252.236 17.6509 253.411 17.3015 254.721 17.3015C254.993 17.3015 255.313 17.3112 255.682 17.3306C256.061 17.35 256.357 17.3743 256.57 17.4034V21.5675C256.396 21.5189 256.085 21.4656 255.638 21.4073C255.192 21.3394 254.746 21.3054 254.299 21.3054C253.27 21.3054 252.353 21.5238 251.547 21.9606C250.751 22.3877 250.12 22.9846 249.654 23.7514C249.189 24.5085 248.956 25.3724 248.956 26.343V40H244.602ZM269.175 40.4513C266.972 40.4513 265.074 39.9806 263.483 39.0391C261.9 38.0878 260.677 36.7532 259.813 35.0352C258.959 33.3074 258.532 31.2836 258.532 28.9638C258.532 26.6731 258.959 24.6541 259.813 22.907C260.677 21.1598 261.881 19.796 263.424 18.8157C264.977 17.8353 266.792 17.3452 268.87 17.3452C270.131 17.3452 271.354 17.5539 272.539 17.9712C273.723 18.3886 274.786 19.0438 275.727 19.9368C276.669 20.8298 277.411 21.9897 277.955 23.4165C278.498 24.8337 278.77 26.5566 278.77 28.5852V30.1286H260.993V26.8672H274.504C274.504 25.7218 274.271 24.7075 273.805 23.8242C273.339 22.9312 272.684 22.2275 271.84 21.7131C271.005 21.1986 270.025 20.9414 268.899 20.9414C267.676 20.9414 266.608 21.2423 265.696 21.8441C264.793 22.4362 264.094 23.2127 263.599 24.1737C263.114 25.1249 262.871 26.1586 262.871 27.2749V29.8228C262.871 31.3176 263.133 32.5891 263.657 33.6374C264.191 34.6857 264.934 35.4865 265.885 36.0398C266.836 36.5833 267.947 36.8551 269.219 36.8551C270.044 36.8551 270.796 36.7386 271.476 36.5057C272.155 36.263 272.742 35.9039 273.237 35.4283C273.733 34.9527 274.111 34.3654 274.373 33.6665L278.494 34.4091C278.164 35.6224 277.571 36.6853 276.717 37.5977C275.873 38.5004 274.81 39.2041 273.529 39.7088C272.257 40.2038 270.806 40.4513 269.175 40.4513Z"
        fill="#2F211A"
      />
      <path
        d="M41.375 22.9426C38.8882 20.4558 35.4324 19.8799 33.6561 21.6561M33.6561 21.6561C31.8799 23.4324 32.4558 26.8882 34.9426 29.375M33.6561 21.6561C33.8705 22.7282 35.0072 25.065 37.8374 25.8369"
        stroke="#2F211A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M38.0598 35.3152C39.8853 37.1408 43.4372 36.5489 45.993 33.993C48.5489 31.4372 49.1408 27.8853 47.3152 26.0598M38.0598 35.3152C36.2342 33.4897 36.8261 29.9378 39.382 27.382C41.9378 24.8261 45.4897 24.2342 47.3152 26.0598M38.0598 35.3152C39.382 34.8745 41.885 34.5127 43.0183 30.3572C43.8117 27.4483 46.2134 26.2801 47.3152 26.0598"
        stroke="#2F211A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="40.2501"
        cy="28.5833"
        r="13.8333"
        stroke="#2F211A"
        stroke-width="2"
      />
    </svg>
  );
}

function Google({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.64 9.20468C17.64 8.5665 17.5827 7.95286 17.4764 7.36377H9V10.8451H13.8436C13.635 11.9701 13.0009 12.9233 12.0477 13.5615V15.8197H14.9564C16.6582 14.2529 17.64 11.9456 17.64 9.20468Z"
        fill="#4285F4"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
        fill="#34A853"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
        fill="#FBBC05"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SmolLogo({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_1784_23607)">
        <path
          d="M4.59028 2.61417C3.98127 2.00517 3.13494 1.86411 2.69994 2.29911M2.69994 2.29911C2.26493 2.73412 2.40599 3.58045 3.01499 4.18945M2.69994 2.29911C2.75244 2.56166 3.03081 3.13395 3.72393 3.32298"
          stroke="#2F211A"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.77838 5.64532C4.22546 6.09241 5.09531 5.94744 5.72122 5.32152C6.34714 4.6956 6.49212 3.82576 6.04503 3.37867M3.77838 5.64532C3.33129 5.19824 3.47627 4.3284 4.10219 3.70248C4.72811 3.07656 5.59795 2.93159 6.04503 3.37867M3.77838 5.64532C4.10219 5.53739 4.71517 5.44879 4.99272 4.43111C5.18701 3.71874 5.77519 3.43264 6.04503 3.37867"
          stroke="#2F211A"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <circle
        cx="4.31478"
        cy="3.99721"
        r="3.32143"
        stroke="#2F211A"
        stroke-width="0.5"
      />
      <defs>
        <clipPath id="clip0_1784_23607">
          <rect
            width="5.14286"
            height="5.14286"
            fill="white"
            transform="translate(1.80456 1.4043)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export { LongLogo, Google, SmolLogo };
