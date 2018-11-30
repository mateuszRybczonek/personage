import { formatTime } from './utils/helpers';
import { SKIPS_RANGE } from './consts';

export default function installFilters(Vue) {
  Vue.filter('time', (value) => {
    if (!value) return '-';
    return formatTime(value);
  });

  Vue.filter('skipsLimit', (value) => {
    const INFINITY_SIGN = '∞';
    return value < SKIPS_RANGE.max ? value : INFINITY_SIGN;
  });

  Vue.filter('teamName', team => team.replace(/([A-Z])/g, ' $1').trim().replace(/^./, char => char.toUpperCase()));
}
