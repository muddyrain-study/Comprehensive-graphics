import axios from 'axios';
// 下载icons
const downloadIcons = async () => {
  const res = await axios.get('https://www.flaticon.com/ajax/search', {
    params: {
      word: '',
      weight: 'regular',
      corner: 'rounded',
      type: 'uicon',
    },
  });
  console.log(res);
};

downloadIcons();
