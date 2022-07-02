import moment from 'moment';

export const formatDate = (date: string, format?: string) => date && moment(date).format(format || 'DD/MM/YYYY');