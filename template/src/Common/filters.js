import moment from 'moment';

export default {
    /**
     * 格式化时间为 日期
     * @param  {[type]} time [description]
     * @return {[type]}      [description]
     */
    evalDate(time) {
        return moment(time).format('YYYY-MM-DD');
    },

    /**
     * 格式化时间为 日期 时分
     * @param  {[type]} time [description]
     * @return {[type]}      [description]
     */
    evalDateTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm');
    }
};
