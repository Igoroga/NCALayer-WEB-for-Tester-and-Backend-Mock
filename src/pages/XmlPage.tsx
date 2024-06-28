import React, { useState } from 'react';
// @ts-ignore
import { NCALayerClient } from "ncalayer-js-client";

const XmlPage: React.FC = () => {
  const [inputFields, setInputFields] = useState([{ id: Date.now(), value: '' }]);
  const [processedData, setProcessedData] = useState<string[]>([]);
console.log();

  const handleInputChange = (id: number, value: string) => {
    setInputFields(fields =>
      fields.map(field => (field.id === id ? { ...field, value } : field))
    );
  };

  const removeInputField = (id: number) => {
    setInputFields(fields => fields.filter(field => field.id !== id));
  };

  const handleSubmit = async () => {
    const inputDataArray = inputFields.map(field => field.value);
    if (inputDataArray.some(value => value.trim() === '')) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const results = await registrationRsaHeadEnd(inputDataArray);
    setProcessedData(results);
  };

  const addInputField = () => {
    setInputFields([...inputFields, { id: Date.now(), value: '' }]);
  };

  async function registrationRsaHeadEnd(xmlDataArray: string[]) {
    const ncalayerClient = new NCALayerClient();

    try {
      await ncalayerClient.connect();
    } catch (error) {
      return ["Не удалось подключиться к NCALayer"];
    }


    let xmlSignature;

      try {
        xmlSignature = await ncalayerClient.basicsSignXML(
          NCALayerClient.basicsStoragesAll,
          xmlDataArray,
          NCALayerClient.basicsXMLParams,
          NCALayerClient.basicsSignerTestAny,
          "ru",
        );

      } catch (error) {
        console.log("Ошибка при выполнении XML-подписи:", error);
      }
      return xmlSignature || [];
  }

  const copyAllToClipboard = () => {
    const jsonData = JSON.stringify(processedData, null, 2);
    navigator.clipboard.writeText(jsonData)
      .then(() => {
        alert('Массив данных успешно скопирован!');
      })
      .catch((err) => {
        alert('Ошибка при копировании массива данных: ');
      });
  };

  return (
    <div className="flex flex-col bg-gray-50 px-5 py-5 relative rounded-xl shadow-md gap-[20px]">
      <span className='text-[20px]'>
        Подпись XML
      </span>
      {inputFields.map((field) => (
        <div key={field.id} className="flex flex-row gap-[10px] mb-4">
          <textarea
            className="max-w-[500px] h-[44px] flex-1 border border-gray-700 rounded-[5px] p-2 placeholder-gray-500"
            placeholder="Введите ваш текст здесь..."
            value={field.value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          ></textarea>
              {inputFields.length > 1 && (
            <button
              className="max-w-[100px] w-full max-h-[44px] bg-red-600 text-white rounded-[5px] hover:bg-red-400"
              onClick={() => removeInputField(field.id)}
            >
              Удалить
            </button>
          )}
        </div>
      ))}
      <div className='flex flex-row gap-[20px]'>
        <button
        className="max-w-[160px] w-full h-[44px]  bg-gray-800 text-white rounded-[5px] hover:bg-gray-600 mb-4 "
        onClick={addInputField}
      >
        Добавить поле
      </button>
      <button
        className="max-w-[100px] w-full max-h-[44px] bg-gray-800 text-white rounded-[5px] hover:bg-gray-600"
        onClick={handleSubmit}
      >
        Подписать
      </button>
      </div>
      <div className='flex max-w-[1200px] flex-wrap'>
  {processedData.length > 0 && (
    <div className='w-full'>
      <div className='border border-black w-full p-[5px] rounded-[5px] relative h-auto mt-4'>
        <pre className='whitespace-pre-wrap break-words'>
          {JSON.stringify(processedData, null, 2)}
        </pre>
        <button
          onClick={copyAllToClipboard}
          className='absolute top-0 right-0 mt-[2px] mr-2 px-2 py-1 bg-gray-800 text-white rounded h-[30px]'
        >
          Копировать все
        </button>
      </div>
    </div>
  )}
</div>


      
    </div>
  );
};

export default XmlPage;
