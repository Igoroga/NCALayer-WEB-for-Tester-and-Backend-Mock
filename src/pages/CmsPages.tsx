
import React, { useState } from 'react';
// @ts-ignore
import { NCALayerClient } from "ncalayer-js-client";




const CmsPages: React.FC = () => {
  const [inputData, setInputData] = useState<any>('');
  const [processedData, setProcessedData] = useState<any>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    const result = await registrationRsaHeadEnd(inputData);
    setProcessedData(result);
  };
  
  async function registrationRsaHeadEnd(cmsData:any) {
    const ncalayerClient = new NCALayerClient();
  
    try {
      await ncalayerClient.connect();
    } catch (error) {
      return "Не удалось подключиться к NCALayer";
    }
  
    let xmlSignature;
  
    try {
      xmlSignature = await ncalayerClient.basicsSignCMS(
        NCALayerClient.basicsStoragesAll,
        cmsData,
        NCALayerClient.basicsCMSParams,
         NCALayerClient.basicsSignerTestAny,
        "ru",
      );
      console.log("Подпись XML:", xmlSignature);
    } catch (error) {
      console.log("Ошибка при выполнении XML-подписи:", error);
      return "Ошибка при выполнении XML-подписи";
    }
  
    if (xmlSignature) {
      xmlSignature = xmlSignature
        .replace('-----BEGIN CMS-----', '')
        .replace('-----END CMS-----', '')
        .trim();
    }
    return xmlSignature || '';
  }

  const copyToClipboard = () => {
    if (processedData) {
      navigator.clipboard.writeText(processedData)
        .then(() => {
          alert('Текст успешно скопирован!');
        })
        .catch((err) => {
          alert('Ошибка при копировании текста: ');
        });
    }
  };

  return (
      <div className="flex flex-col bg-gray-50 px-5 py-5 relative rounded-xl shadow-md gap-[20px]">
        <span className='text-[20px]'>
        Подпись CMS
      </span>
        <div className="flex flex-row gap-[30px]">
          <textarea
            className="max-w-[500px] h-[44px] flex-1 border border-gray-700 rounded-[5px] p-2 placeholder-gray-500"
            placeholder="Введите ваш текст здесь..."
            value={inputData}
            onChange={handleInputChange}
          ></textarea>
          <button
            className="flex-1 max-w-[100px] max-h-[44px] bg-gray-800 text-white rounded-[5px] hover:bg-gray-600"
            onClick={handleSubmit}
          >
            Подписать
          </button>
        </div>
        
        <div>
      {processedData && (
        <div className='border border-black max-w-[1500px] w-full p-[5px] rounded-[5px] relative h-auto'>
          {processedData}
          <button
            onClick={copyToClipboard}
            className='absolute top-0 right-0 mt-[2px] mr-2 px-2 py-1 bg-gray-800 text-white rounded h-[30px]'
          >
            Копировать
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default CmsPages