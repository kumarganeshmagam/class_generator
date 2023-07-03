import './App.css';
import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

function App() {

  const [classValue, setClassValue] = useState("");
  const [jsonValue, setJsonValue] = useState("");
  const base_prompt = 'Act as an expert programmer in Java with knowledge of computer vision and also an expert in software quality engineering. Below is the List with key and value pairs, Generate selenium Java code using Page object model and write the methods to interact with its web elements for all key value pairs:'
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
  const [apiResponse, setApiResponse] = useState("");
  const getClassValue = (event)=>{
    setClassValue(event.target.value);
  }
  const getJsonValue = (event)=>{
     setJsonValue(event.target.value);
  };
  const handleSubmit = async (e) => {
    const promp = base_prompt+jsonValue+'and class name as '+classValue
    console.log(promp)
    e.preventDefault();
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promp,
        temperature: 0.5,
        max_tokens: 1500,
      });
      //console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
  };

 
  return (
    <>
     <h3>Json to Page Object Model Generator</h3>
<div className="head">
 
<form onSubmit={handleSubmit}>
<div className="myRow">
  <label htmlFor="source">Class Name : </label>
  <textarea id="class" onChange={getClassValue}></textarea>
</div>

<div className="myRow">
  <label htmlFor="source">Json : </label>
  <textarea id="json" onChange={getJsonValue}></textarea>
</div>
<div className="myRow">
  <button  type="submit">Generate</button>
</div>
</form>
</div>

{apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )}

    </>
  );
}

export default App;
