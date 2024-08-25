import _, { isNil } from 'lodash';
declare module 'lodash' {
    interface LoDashStatic {
        toNumberDefault(value: any, defaultValue: number): number;
        isEmptyValue(value: any): boolean;
    }
}

// _.mixin({
//     toNumberDefault: function (value: any, defaultValue: number) {
//         const val = _.toNumber(value);
//         if (!!defaultValue && isNaN(val)) {
//             return defaultValue;
//         } else return val;
//     },

//     isEmptyValue: function (value: any) {
//         return value === '' || isNil(value) || isNaN(value);
//     },
// });
