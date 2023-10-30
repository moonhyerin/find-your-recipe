import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BaseSection from '../components/BaseSection';
import Label from '../components/Label';

import { API_URL, API_HOST, API_KEY } from '../constant';
import { RecipeType } from '../types';

function DetailPage() {
  const { recipeId } = useParams();
  const [details, setDetails] = useState<RecipeType>();

  useEffect(() => {
    async function fetchDetail() {
      // FIX ME: WRITE FOR TESTING !!!
      const check = localStorage.getItem('details');

      if (check) {
        const data = JSON.parse(check);
        setDetails(data);
      } else {
        const options = {
          method: 'GET',
          url: `${API_URL}/${recipeId}/information`,
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
          },
        };

        try {
          const response = await axios.request(options);
          const data = response.data;

          localStorage.setItem('details', JSON.stringify(data));
          setDetails(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchDetail();
  }, [recipeId]);

  return (
    <BaseSection>
      {details && (
        <>
          <div>{details.title}</div>
          <div>
            {details.dishTypes.map((dishType) => (
              <Label value={dishType} customStyle='text-base p-2' />
            ))}
          </div>
          <div>
            <img alt='' src={details.image} />
          </div>
          <div>{details.readyInMinutes}</div>
          <div>
            {details.instructions.split('. ').map((sentence, i) => (
              <p>
                {i + 1}. {sentence}
              </p>
            ))}
          </div>
        </>
      )}
    </BaseSection>
  );
}

export default DetailPage;
