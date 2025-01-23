import icon1 from 'assets/icon1.png';
import icon2 from 'assets/icon2.png';
import icon3 from 'assets/icon3.png';
import icon4 from 'assets/icon4.png';
import icon5 from 'assets/icon5.png';

function getImageSrcByValue(value: string): string | undefined {
  const options = [
    {
      label: 'rabbit',
      value: '01',
      image: icon1,
    },
    {
      label: 'Dog',
      value: '02',
      image: icon2,
    },
    {
      label: 'Cat',
      value: '03',
      image: icon3,
    },
    {
      label: 'bear',
      value: '04',
      image: icon4,
    },
    {
      label: 'panda',
      value: '05',
      image: icon5,
    },
  ];

  const selectedOption = options.find((option) => option.value === value);
  return selectedOption?.image;
}

export { getImageSrcByValue };
