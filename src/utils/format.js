import { replace } from 'lodash';
import numeral from 'numeral';
import { format, formatDistanceToNow } from 'date-fns';
// import BigNumber from 'bignumber.js';

// Number ----------------------------------------------------------------------

export function fCurrency(number, fix) {
    try {
        let str = number + '';
        if (str.indexOf('e') >= 0) {
            str = number.toFixed(8) + '';
        }
        const deleteText = str.replace(/[^\d.]/g, ''); //clear text
        const x = deleteText.split('.');
        let x1 = x[0];
        const x2 = x[1];
        const x3 = x.length > 1 ? '.' + x2.slice(0, fix || 8) : '';
        if (!x1) x1 = '0';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1,$2');
        }
        let result = (x1 + x3).replace(/^0+(?!\.|$)/, '').replace(/^\./, '');
        return `${number < 0 ? '-' : ''}${result}`;
    } catch (e) {
        return '0.00';
    }
}

export function fPercent(number) {
    return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
    return numeral(number).format();
}

export function fShortenNumber(number) {
    return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
    return numeral(number).format('0.0 b');
}

export function fRoundDown(number, decimals) {
    decimals = decimals || 0;
    return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Date time ----------------------------------------------------------------------

export function fDate(date) {
    return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
    return format(new Date(date), 'yyyy-MM-dd HH:mm');
}

export function fDateTimeSuffix(date) {
    return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}

// String ----------------------------------------------------------------------

export function fDisplayName(displayName = '') {
    const length = displayName.length;
    if (length > 15) {
        return `${displayName.substring(0, 5)}...${displayName.substring(length - 5, length)}`;
    }
    return displayName;
}

export function fAddress(text) {
    const length = text.length;
    if (length > 15) {
        return `${text.substring(0, 8)}...${text.substring(length - 8, length)}`;
    }
    return text;
}




// export function parseAmount(amount, coinDecimals) {
//     try {
//         return BigInt(new BigNumber(amount).shiftedBy(coinDecimals).integerValue().toString());
//     } catch (e) {
//         return BigInt(0);
//     }
// }