export const formatNumber = (num: number, options?: { format?: string, decimals?: number, percentValues?: boolean }) => {
  if (num === null) return '-';
  const { decimals, format, percentValues } = options || {};
  if (percentValues) {
    return `${formatNumberWithSeparators(num, 2)}%`;
  }
  if (format) {
    return formatNumberByFormat(num, format);
  }
  const absNum = Math.abs(num);
  if (absNum >= 1000000000) {
    return formatNumberWithSeparators((num / 1000000000), decimals || 3) + 'B';
  }
  if (absNum >= 1000000) {
    return formatNumberWithSeparators((num / 1000000), decimals || 3) + 'M';
  }
  if (absNum >= 1000) {
    return formatNumberWithSeparators((num / 1000), decimals || 3) + 'K';
  }
  if (absNum < 0.0000001) {
    return formatNumberWithSeparators(num);
  }
  if (absNum < 0.00001) {
    return formatNumberWithSeparators(num, 6);
  }
  if (absNum < 0.001) {
    return formatNumberWithSeparators(num, 4);
  }
  return formatNumberWithSeparators(num, 2);
}

export const formatNumberByFormat = (num: number, format: string, separators?: boolean) => {
  if (!format) return formatNumberWithSeparators(num);
  const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
  if (format.includes('%')) {
    return formatNumberWithSeparators((num * 100), decimalPlaces) + '%';
  }
  const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
  const roundedNum = formatNumberWithSeparators(num, decimalPlaces);
  if (separators || !(format.includes('m') || format.includes('a'))) {
    return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
  }
  const parts = roundedNum.split('.');
  const decimalPart = parts.length > 1 ? parts[1] : '';
  const integerPart = formatNumber(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
  return `${currencySymbol}${integerPart}`;
}

export const formatNumberWithSeparators = (value: number, precision?: number) => {
  if (!value) value = 0;
  if (precision || precision === 0) {
    let outputStr = '';
    if (value >= 1) {
      outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
    } else {
      outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
    }
    return outputStr;
  }
  return value.toLocaleString('en-US');
}

export const groupArrayByKey = (arr: [ Date | string, string | number ][]) => {
  return arr.reduce((acc, [key, value]) => {
    const group = acc.find(([k, _]) => k.toString() === key.toString());
    if (group) {
      const val = group[1];
      group[1] = val === null ? value : isNaN(Number(val)) ? val : Number(val) + Number(value);
    } else {
      acc.push([key, value]);
    }
    return acc;
  }, []);
}

export const groupByCategory = (data: { [key: string]: any }[], category: string, xAxis: string, yAxis: string) => {
  return data.reduce((result, item) => {
    const _category = item[category];
    if (!result[_category]) {
      result[_category] = {};
    }
    result[_category][item[xAxis]] = item[yAxis];
    return result;
  }, {});
}

export const extractUniqueTimes = (data: { [key: string]: any }[], keyValue: string) => {
  return data.reduce((acc, cur) => {
    if (!acc.hasOwnProperty(cur[keyValue])) {
      acc[cur[keyValue]] = null;
    }
    return acc;
  }, {});
}

export const concatUnique = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
  const merged = { ...obj1, ...obj2 };
  return Object.keys(merged).reduce((acc, key) => {
    if (!acc.hasOwnProperty(key)) {
      acc[key] = merged[key];
    }
    return acc;
  }, {});
}

export const callAPI = async (apiEndpoint: string) => {
  if (!apiEndpoint) return [];
  try {
    const response = await fetch(apiEndpoint);
    const jsonData = await response.json();
    return jsonData.result.rows || [];
  } catch (error) {
    console.log(error);
  }
  return [];
}