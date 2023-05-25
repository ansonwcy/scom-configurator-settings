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
  const decimalPlaces = format.split('.')[1] ? format.split('.').length : 0;
  if (format.includes('%')) {
    return formatNumberWithSeparators((num * 100), decimalPlaces) + '%';
  }
  const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
  const roundedNum = formatNumberWithSeparators(num, decimalPlaces);
  if (separators && !format.includes('.ma')) {
    return `${currencySymbol}${roundedNum}`;
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