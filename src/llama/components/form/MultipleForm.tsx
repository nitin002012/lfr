import React, { useState, forwardRef } from "react";
import RenderForm from './RenderForm';
import Loader from "../utils/Loader";

interface LooseObject {
  [key: string]: any;
}
interface Props {
  initialStep: number;
  fields: any;
  parentState: object;
  parentSetState: object;
  wizardStepSet: object;
  onSubmit: any;
  buttons: LooseObject;
  step: any;
  wizardStepOptions: any;
  stepLength: any;
}

const MultipleForm = forwardRef((props: Props, ref: any) => {
  const findStepByDStep = (dstep) => {
    for (const key in props.wizardStepSet) {
      const steps = props.wizardStepSet[key];
      if (steps.includes(dstep)) {
        return steps[0]; // returns the primary step
      }
    }
    return null; // if dstep is not found
  };
  const [step, setStep] = useState(props.initialStep ?? 1);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = props.fields;
  const data: any = props.parentState;
  let fieldSet: LooseObject = props.wizardStepSet;

  const alertRender = () => {
    return (
      <p
        style={{
          width: "100%",
          backgroundColor: "#ffc3b2",
          color: "#902100",
          padding: "5px 10px",
          fontSize: "16px",
          fontWeight: 300,
          fontFamily: "Nunito Sans",
          border: "none",
          borderRadius: "5px",
          textAlign: "center",
        }}>
        {alertMsg}
      </p>
    );
  };

  const handleNext = async () => {
    setLoading(true);
    let currentFields = fieldSet[step];
    for (let i in currentFields) {
      if (
        data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required
      ) {
        setAlert(false);
        setAlertMsg(`${currentFields[i]} field is required data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required 62`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 3000);
        return;
      }
      // const result = props.wizardStepSet?.find(subArray => subArray.includes(currentFields[i]));

      setAlert(false);
      
      if (data[currentFields[i]]?.error && props.parentState[findStepByDStep(currentFields[i])].value === fields[currentFields[i]].dependent.value[0]) {
          setAlertMsg(`Please look into ${currentFields[i]} field data[currentFields[i]]?.error72`);
          console.log("prpops are",props);
          console.log("data is",findStepByDStep('dstep10'));
          console.log("data value fields[currentFields[i]].dependent.value[0]",fields[currentFields[i]].dependent.value[0]);
          
          
          console.log("prpops are.........",props.parentState[currentFields[i]]);
          // const res = props.wizardStepSet?.map(id =>{id})
          // console.log(res);
          

          
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
            setLoading(false);
          }, 3000);
          console.log("data[currentFields[i]]",data[currentFields[i]]);
          
          return;
        }
          if(data[currentFields[i]]?.error && props.parentState[findStepByDStep(currentFields[i])].value!= fields[currentFields[i]].dependent.value[0]){
            console.log("value is ----------------------===========================----------------------");
            console.log("data[currentFields[i]]",data[currentFields[i]].value);
            console.log("props.parentState[currentFields[i]].value",props.parentState[currentFields[i]].value);
            console.log(" fields[currentFields[i]].dependent.value[0]", fields[currentFields[i]].dependent.value[0]);
            console.log("currentFields[i]",props.parentState[currentFields[i]].value);
            
            
            props.parentState[currentFields[i]].value = "";
            data[currentFields[i]].value=''
            props.parentState[currentFields[i]].error = false ;

            console.log("currentFields[i]",props.parentState[currentFields[i]]);


          }
      
      
      if (data[currentFields[i]].value === "" &&
        fields[currentFields[i]].dependentRequired) {
          console.log(data[currentFields[i]]);
          console.log(fields[currentFields[i]].value);
          

        if (fields[currentFields[i]]?.dependent?.value?.every((key: any) => Object.keys(data[fields[currentFields[i]]?.parentField]?.value).includes(key)) || Object.keys(data[fields[currentFields[i]]?.parentField]?.value).some((val: any) => fields[currentFields[i]]?.dependent?.value?.includes(val)) || fields[currentFields[i]]?.dependent?.value[0] === data[fields[currentFields[i]]?.parentField]?.value) {
          setAlert(false);
          setAlertMsg(`${fields[currentFields[i]].value} field is required data[currentFields[i]].value === "" &&
        fields[currentFields[i]].dependentRequired 85`);
          setAlert(true);
          console.log(fields[currentFields[i]]);
          
          setTimeout(() => {
            setAlert(false);
            setLoading(false);
          }, 3000);
          return;
        }
      }
    }
    let finalData: any = {};
    for (let key in data) {
      if (fields[key].type === "anchor" || fields[key].type === "paragraph" || fields[key].type === "html") {
        continue
      }
      finalData[key] = data[key].value;
    }

    let currentData = {
      step: step,
      data: finalData,
      stepLength: props?.stepLength
    };

    let wizardStepOptions = props?.wizardStepOptions;

    // if onNext not available for specific steps then call global one
    if (wizardStepOptions && props?.wizardStepOptions[step]?.onNext) {
      await props?.wizardStepOptions[step]?.onNext(currentData);
    } else {
      if (wizardStepOptions?.onNext) {
        await wizardStepOptions.onNext(currentData);
      }
    }

    setStep(step + 1);
    props.step(step + 1);
    setLoading(false);
  };

  const handlePrevious = async () => {
    setLoading(true);

    //final data for return
    let finalData: any = {};
    for (let key in data) {
      if (fields[key].type === "anchor" || fields[key].type === "paragraph" || fields[key].type === "html") {
        continue
      }
      finalData[key] = data[key].value;
    }

    let currentData = {
      step: step,
      data: finalData,
      stepLength: props?.stepLength
    };

    let wizardStepOptions = props?.wizardStepOptions;

    // if onNext not available for specific steps then call global one
    if (wizardStepOptions && props?.wizardStepOptions[step]?.onPrev) {
      await props?.wizardStepOptions[step]?.onPrev(currentData);
    } else {
      if (wizardStepOptions?.onPrev) {
        await wizardStepOptions.onPrev(currentData);
      }
    }


    setStep(step - 1);
    props.step(step - 1);
    setLoading(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    let currentFields = fieldSet[step];
    for (let i in currentFields) {
      if (
        data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required
      ) {
        setAlert(false);
        setAlertMsg(`${currentFields[i]} field is required data[currentFields[i]].value === "" &&
        fields[currentFields[i]].required 169`);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 5000);
        return;
      }
      if (data[currentFields[i]]?.error ) {
        setAlert(false);
        setAlertMsg(`Please look into ${currentFields[i]} field pg 206`);
        console.log("currentFields[i]",currentFields[i]);
        
        console.log("data[parentFields[i]",data[currentFields[i]] ); //dstep12.2
        console.log("parentfield[i]",findStepByDStep(currentFields[i]));
        
        
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setLoading(false);
        }, 5000);
        return;
      }
      //changini it
      if (data[currentFields[i]].value === "" &&
        fields[currentFields[i]].dependentRequired) {
        if (fields[currentFields[i]]?.dependent?.value?.every((val: any) => Object.keys(data[fields[currentFields[i]]?.parentField]?.value).includes(val)) || Object.keys(data[fields[currentFields[i]]?.parentField]?.value).some((val: any) => fields[currentFields[i]]?.dependent?.value?.includes(val)) || fields[currentFields[i]]?.dependent?.value[0] === data[fields[currentFields[i]]?.parentField]?.value) {
          setAlert(false);
          console.log('data[currentFields[i]].value',findStepByDStep(currentFields[i]));
          console.log('fields[currentFields[i]',fields[currentFields[i]].dependent.value[0]);
          console.log('fields[currentFields[i]',fields[currentFields[i]]);

          
          
          setAlertMsg(`${currentFields[i]} field is required data[currentFields[i]].value === "" &&
        fields[currentFields[i]].dependentRequired 255`);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
            setLoading(false);
          }, 3000);
          return;
        }
      }
    }
    let finalData: any = {};
    for (let key in data) {
      if (fields[key].type === "anchor" || fields[key].type === "paragraph" || fields[key].type === "html") {
        continue
      }
      finalData[key] = data[key].value;
    }
    props.onSubmit(finalData);
    setLoading(false);
  };

  return (
    <>
      {alert && alertRender()}
      <RenderForm
        parentState={props.parentState}
        parentSetState={props.parentSetState}
        fields={fields}
        renderList={fieldSet[step]}
      />

      <button
        className='btn llm-prev-btn'
        disabled={step === 1 ? true : false}
        onClick={handlePrevious}>
        {[
          props?.buttons?.["previous"]?.text ?? "Previous",
          props?.buttons?.["previous"]?.loader ? (
            loading ? (
              <Loader key={"key"} />
            ) : null
          ) : null,
        ]}
      </button>
      {step === parseInt(String(Object.keys(fieldSet).pop())) ? (
        <button className='btn llm-submit-btn' onClick={handleSubmit} ref={ref}>
          {[
            props?.buttons?.["submit"]?.text ?? "Submit",
            props?.buttons?.["next"]?.loader ? (
              loading ? (
                <Loader key={"key"} />
              ) : null
            ) : null,
          ]}
        </button>
      ) : (
        <button
          className='btn llm-next-btn'
          onClick={handleNext}
          disabled={loading}
          ref={ref}>
          {[
            props?.buttons?.["next"]?.text ?? "Next",
            props?.buttons?.["next"]?.loader ? (
              loading ? (
                <Loader key={"key"} />
              ) : null
            ) : null,
          ]}
        </button>
      )}

      <style>
        {`
          .btn {
            background-color: #ddd;
            border-radius: 5px;
            border: none;
            padding: 5px 10px;
            font-size: 16px;
            font-family: "Nunito Sans";
            margin: 20px 5px;
          }
        `}
      </style>
    </>
  );
});
export default MultipleForm;
