import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { IconProps } from "../types";

export const SafariIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(
    ({ className, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 24 24"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          d="M12.6029 12.6029L11.3971 11.3971L9.09677 14.9032L12.6029 12.6029ZM12 4C7.58065 4 4 7.58065 4 12C4 16.4194 7.58065 20 12 20C16.4194 20 20 16.4194 20 12C20 7.58065 16.4194 4 12 4ZM17.0274 9.63839L17.5042 9.44065C17.5355 9.4277 17.5691 9.42105 17.603 9.42108C17.6369 9.42111 17.6704 9.42781 17.7017 9.44082C17.733 9.45382 17.7615 9.47286 17.7854 9.49685C17.8094 9.52084 17.8284 9.54931 17.8413 9.58065C17.8543 9.61197 17.861 9.64555 17.861 9.67947C17.861 9.71338 17.8544 9.74697 17.8414 9.77831C17.8284 9.80965 17.8094 9.83812 17.7854 9.8621C17.7614 9.88608 17.733 9.9051 17.7016 9.91806L17.2258 10.1152C17.1626 10.1413 17.0916 10.1413 17.0283 10.1151C16.9651 10.0889 16.9149 10.0387 16.8887 9.97548C16.8625 9.91238 16.8624 9.84145 16.8884 9.77826C16.9144 9.71506 16.9644 9.66476 17.0274 9.63839ZM13.8848 6.77419L14.0823 6.29742C14.1086 6.23438 14.1589 6.18437 14.2221 6.15837C14.2853 6.13236 14.3563 6.13249 14.4194 6.15871C14.4826 6.1849 14.5328 6.23512 14.559 6.29834C14.5852 6.36155 14.5852 6.43258 14.559 6.49581L14.3613 6.97258C14.3351 7.0358 14.2849 7.08602 14.2217 7.11222C14.1584 7.13841 14.0874 7.13842 14.0242 7.11226C13.9928 7.09926 13.9643 7.0802 13.9403 7.05616C13.9163 7.03212 13.8973 7.00357 13.8843 6.97217C13.8714 6.94076 13.8647 6.9071 13.8648 6.87313C13.8649 6.83915 13.8717 6.80553 13.8848 6.77419ZM12 5.67742C12.0684 5.67742 12.1341 5.70461 12.1825 5.753C12.2309 5.8014 12.2581 5.86704 12.2581 5.93548V6.45161C12.2581 6.52006 12.2309 6.5857 12.1825 6.63409C12.1341 6.68249 12.0684 6.70968 12 6.70968C11.9316 6.70968 11.8659 6.68249 11.8175 6.63409C11.7691 6.5857 11.7419 6.52006 11.7419 6.45161V5.93548C11.7419 5.86704 11.7691 5.8014 11.8175 5.753C11.8659 5.70461 11.9316 5.67742 12 5.67742ZM9.58065 6.15871C9.61197 6.1457 9.64555 6.139 9.67947 6.13898C9.71338 6.13896 9.74697 6.14563 9.77831 6.1586C9.80965 6.17158 9.83812 6.1906 9.8621 6.21458C9.88608 6.23857 9.9051 6.26705 9.91806 6.29839L10.1152 6.77419C10.1289 6.80563 10.1362 6.8395 10.1367 6.87381C10.1372 6.90812 10.1309 6.94218 10.1181 6.97401C10.1052 7.00583 10.0862 7.03478 10.062 7.05916C10.0379 7.08354 10.0091 7.10285 9.97743 7.11598C9.94572 7.12911 9.91172 7.13578 9.87741 7.13561C9.8431 7.13544 9.80916 7.12843 9.77759 7.11498C9.74602 7.10154 9.71745 7.08194 9.69355 7.05732C9.66965 7.0327 9.65089 7.00357 9.63839 6.97161L9.44065 6.49484C9.4148 6.43168 9.41502 6.36087 9.44126 6.29787C9.46749 6.23488 9.51761 6.18484 9.58065 6.15871ZM7.52968 7.52935C7.57807 7.48099 7.64368 7.45383 7.7121 7.45383C7.78051 7.45383 7.84612 7.48099 7.89452 7.52935L8.25806 7.89419C8.30613 7.94255 8.33311 8.00795 8.33311 8.07613C8.33311 8.14431 8.30613 8.20971 8.25806 8.25806C8.20967 8.30642 8.14406 8.33359 8.07564 8.33359C8.00723 8.33359 7.94162 8.30642 7.89323 8.25806L7.52839 7.89323C7.48045 7.84475 7.45365 7.77927 7.45383 7.71109C7.45401 7.64291 7.48116 7.57758 7.52935 7.52935H7.52968ZM5.67742 12C5.67742 11.9316 5.70461 11.8659 5.753 11.8175C5.8014 11.7691 5.86704 11.7419 5.93548 11.7419H6.45161C6.52006 11.7419 6.5857 11.7691 6.63409 11.8175C6.68249 11.8659 6.70968 11.9316 6.70968 12C6.70968 12.0684 6.68249 12.1341 6.63409 12.1825C6.5857 12.2309 6.52006 12.2581 6.45161 12.2581H5.93548C5.86704 12.2581 5.8014 12.2309 5.753 12.1825C5.70461 12.1341 5.67742 12.0684 5.67742 12ZM6.97258 14.3616L6.49581 14.5594C6.46448 14.5723 6.43091 14.5789 6.39701 14.5789C6.36312 14.5789 6.32956 14.5722 6.29826 14.5592C6.26695 14.5462 6.23852 14.5271 6.21457 14.5032C6.19063 14.4792 6.17165 14.4507 6.15871 14.4194C6.1457 14.388 6.139 14.3545 6.13898 14.3205C6.13896 14.2866 6.14563 14.253 6.1586 14.2217C6.17158 14.1904 6.1906 14.1619 6.21458 14.1379C6.23857 14.1139 6.26705 14.0949 6.29839 14.0819L6.77419 13.8848C6.83742 13.8587 6.90845 13.8587 6.97166 13.8849C7.03488 13.9111 7.0851 13.9613 7.11129 14.0245C7.13751 14.0876 7.13764 14.1585 7.11163 14.2217C7.08563 14.2849 7.03562 14.3352 6.97258 14.3616ZM7.11226 9.97452C7.09939 10.006 7.08041 10.0347 7.05642 10.0588C7.03244 10.0829 7.00391 10.1021 6.97249 10.1152C6.94107 10.1283 6.90737 10.135 6.87334 10.135C6.83931 10.135 6.80561 10.1282 6.77419 10.1152L6.29742 9.91774C6.23438 9.89137 6.18437 9.84107 6.15837 9.77787C6.13236 9.71468 6.13249 9.64375 6.15871 9.58065C6.1849 9.51743 6.23512 9.4672 6.29834 9.44101C6.36155 9.41482 6.43258 9.4148 6.49581 9.44097L6.97258 9.63871C7.03572 9.6649 7.08588 9.71507 7.11207 9.77821C7.13825 9.84135 7.13832 9.9123 7.11226 9.97548V9.97452ZM10.1152 17.2258L9.91774 17.7026C9.90478 17.7339 9.88577 17.7624 9.86181 17.7864C9.83784 17.8103 9.80939 17.8294 9.77807 17.8423C9.74676 17.8553 9.71319 17.862 9.67929 17.862C9.64538 17.862 9.61181 17.8554 9.58048 17.8424C9.54916 17.8295 9.52069 17.8104 9.49671 17.7865C9.47273 17.7625 9.4537 17.7341 9.44072 17.7028C9.42773 17.6714 9.42104 17.6379 9.42103 17.604C9.42102 17.5701 9.42768 17.5365 9.44065 17.5052L9.63839 17.0284C9.65089 16.9964 9.66965 16.9673 9.69355 16.9427C9.71745 16.9181 9.74602 16.8985 9.77759 16.885C9.80916 16.8716 9.8431 16.8646 9.87741 16.8644C9.91172 16.8642 9.94572 16.8709 9.97743 16.884C10.0091 16.8971 10.0379 16.9165 10.062 16.9408C10.0862 16.9652 10.1052 16.9942 10.1181 17.026C10.1309 17.0578 10.1372 17.0919 10.1367 17.1262C10.1362 17.1605 10.1289 17.1944 10.1152 17.2258ZM12.2581 18.0645C12.2581 18.133 12.2309 18.1986 12.1825 18.247C12.1341 18.2954 12.0684 18.3226 12 18.3226C11.9316 18.3226 11.8659 18.2954 11.8175 18.247C11.7691 18.1986 11.7419 18.133 11.7419 18.0645V17.5484C11.7419 17.4799 11.7691 17.4143 11.8175 17.3659C11.8659 17.3175 11.9316 17.2903 12 17.2903C12.0684 17.2903 12.1341 17.3175 12.1825 17.3659C12.2309 17.4143 12.2581 17.4799 12.2581 17.5484V18.0645ZM14.4194 17.8413C14.388 17.8543 14.3545 17.861 14.3205 17.861C14.2866 17.861 14.253 17.8544 14.2217 17.8414C14.1904 17.8284 14.1619 17.8094 14.1379 17.7854C14.1139 17.7614 14.0949 17.733 14.0819 17.7016L13.8848 17.2258C13.8587 17.1626 13.8587 17.0916 13.8849 17.0283C13.9111 16.9651 13.9613 16.9149 14.0245 16.8887C14.0877 16.8625 14.1588 16.8626 14.222 16.8888C14.2852 16.9149 14.3354 16.9652 14.3616 17.0284L14.5594 17.5052C14.5852 17.5683 14.585 17.6391 14.5587 17.7021C14.5325 17.7651 14.4824 17.8152 14.4194 17.8413ZM16.4703 16.4706C16.4219 16.519 16.3563 16.5462 16.2879 16.5462C16.2195 16.5462 16.1539 16.519 16.1055 16.4706L15.7419 16.1058C15.6939 16.0575 15.6669 15.992 15.6669 15.9239C15.6669 15.8557 15.6939 15.7903 15.7419 15.7419C15.7903 15.6936 15.8559 15.6664 15.9244 15.6664C15.9928 15.6664 16.0584 15.6936 16.1068 15.7419L16.4716 16.1068C16.5195 16.1553 16.5464 16.2207 16.5462 16.2889C16.546 16.3571 16.5188 16.4224 16.4706 16.4706H16.4703ZM12.9758 12.9758L7.30129 16.6987L11.0242 11.0242L16.6987 7.30129L12.9758 12.9758ZM17.8413 14.4194C17.8151 14.4826 17.7649 14.5328 17.7017 14.559C17.6384 14.5852 17.5674 14.5852 17.5042 14.559L17.0274 14.3613C16.9642 14.3351 16.914 14.2849 16.8878 14.2217C16.8616 14.1584 16.8616 14.0874 16.8877 14.0242C16.9007 13.9928 16.9198 13.9643 16.9438 13.9403C16.9679 13.9163 16.9964 13.8973 17.0278 13.8843C17.0592 13.8714 17.0929 13.8647 17.1269 13.8648C17.1608 13.8649 17.1945 13.8717 17.2258 13.8848L17.7026 14.0823C17.7656 14.1086 17.8156 14.1589 17.8416 14.2221C17.8676 14.2853 17.8675 14.3563 17.8413 14.4194ZM18.0645 12.2581H17.5484C17.4799 12.2581 17.4143 12.2309 17.3659 12.1825C17.3175 12.1341 17.2903 12.0684 17.2903 12C17.2903 11.9316 17.3175 11.8659 17.3659 11.8175C17.4143 11.7691 17.4799 11.7419 17.5484 11.7419H18.0645C18.133 11.7419 18.1986 11.7691 18.247 11.8175C18.2954 11.8659 18.3226 11.9316 18.3226 12C18.3226 12.0684 18.2954 12.1341 18.247 12.1825C18.1986 12.2309 18.133 12.2581 18.0645 12.2581Z"
          fill="currentColor"
        />
      </svg>
    ),
  ),
);

SafariIcon.displayName = "SafariIcon";
