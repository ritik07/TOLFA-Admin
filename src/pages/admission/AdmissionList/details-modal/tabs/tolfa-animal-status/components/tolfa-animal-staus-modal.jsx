import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Button, Modal, Form, Select, Row, Col, message, Input } from 'antd';
import { ABC_STATUS, BODY_SCORE, CONDITION, INJURY, INJURY_LOCATION, OTHER_ADMISSION, PROBLEM, SICKNESS, SICKNESS_SYMPTOMS } from '../../../../../../../constants/conifg'
import { updateTolfaAnimalStatus } from '../../../../../../../services/master_service';
import Loader from '../../../../../../../components/loader/loader';
import { createNotification } from '../../../../../../../utils/notify';
import { handleLogout } from '../../../../../../../global/function.global';
import TextArea from 'antd/es/input/TextArea';

const TolfaAnimalStausModal = ({ isModalOpen, setIsModalOpen, rescue_no, rowData, statusTypeData, status_id, refetchAdmissionList, setShowModal }) => {
  const AUTH_TOKEN = localStorage.getItem('auth_token');
  const USER_ID = localStorage.getItem("user_id");

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...rowData,
      status_id: status_id,
      condition: rowData.condition_value,
      problem_type: rowData.problem_type?.replace(/"/g, '').split(','),
      alt_problem_type: rowData.alt_problem_type?.replace(/"/g, '').split(','),
      alt_injury_location: rowData.alt_injury_location?.replace(/"/g, '').split(','),
      injury_location: rowData.injury_location?.replace(/"/g, '').split(','),
      alt_symptoms: rowData.alt_symptoms?.replace(/"/g, '').split(','),
      symptoms: rowData.symptoms?.replace(/"/g, '').split(','),
    })
    setProblemType(rowData.problem)
    setOtherCondition(rowData.alt_problem)

  }, [])

  const [problemType, setProblemType] = useState(false)
  const [otherCondition, setOtherCondition] = useState(false)

  const handleProblem = (value) => {
    setProblemType(value)
  }

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const computeProblemType = (value) => {
    if (value === 'symptoms') {
      if (problemType === 'sick') {
        return SICKNESS_SYMPTOMS
      } else if (problemType === 'injured') {
        return INJURY_LOCATION
      } else {
        return INJURY_LOCATION
      }
    } else if (value === 'problem_type') {
      if (problemType === 'sick') {
        return SICKNESS
      } else if (problemType === 'injured') {
        return INJURY
      } else {
        return OTHER_ADMISSION
      }
    }
  }

  /**
* @Function
*/
  const { mutate: updateTolfaAnimalStatusMutation, isLoading, isError, isSuccess } = useMutation(
    (formData) => updateTolfaAnimalStatus(AUTH_TOKEN, formData),
    {
      // onSuccess callback will be called when the mutation is successful
      onSuccess: () => {
        createNotification("success", {
          title: "Detail updated",
          message: "Tolfa location details updated",
        });
        form.resetFields()
        setShowModal(false)
        refetchAdmissionList()
        setIsModalOpen(false)
        message.success("Record added!!")
        // You can perform additional actions or updates here
      },
      // onError callback will be called when the mutation encounters an error
      onError: (error) => {
        console.error('Error posting data:', error);
        // You can handle errors or display error messages here
      },
    }
  );

  const onCreate = (values) => {
    try {
      const payload = {
        rescue_id: rescue_no,
        ...values,
        alt_injury_location: values.alt_injury_location?.join(","),
        alt_problem_type: values.alt_problem_type?.join(","),
        injury_location: values.injury_location?.join(","),
        problem_type: values.problem_type?.join(","),
        alt_symptoms: values.alt_symptoms?.join(","),
        symptoms: values.symptoms?.join(","),
        condition_value: values.condition,
        created_by: USER_ID,
      }
      console.log("payload", payload);
      updateTolfaAnimalStatusMutation(payload)
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleOtherCondition = (value) => {
    setOtherCondition(value)
  }

  return (
    <Modal
      width={"80%"}
      open={isModalOpen}
      title="Create a new collection"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      {true ?
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Row gutter={[10, 10]}>
            <Col xl={8}>
              <Form.Item label='ABC Status' name='abc_status'>
                <Select
                  placeholder="Please select main color"
                  style={{
                    width: '100%',
                  }}
                  options={ABC_STATUS}
                />
              </Form.Item>
            </Col>

            <Col xl={8}>
              <Form.Item label='Tattoo Number (Optional)' name='tattoo_number'>
                <Input
                  placeholder="Please select main color"
                  style={{
                    width: '100%',
                  }}
                  options={ABC_STATUS}
                />
              </Form.Item>
            </Col>

            <Col xl={8}>
              <Form.Item label="Status" name="status_id">
                <Select
                  placeholder="Status"
                  style={{ width: "100%" }}
                >
                  {statusTypeData.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col xl={8}>
              <Form.Item label='Condition' name='condition'>
                <Select
                  placeholder="Please select condition"
                  style={{
                    width: '100%',
                  }}
                  options={CONDITION}
                />
              </Form.Item>
            </Col>

            <Col xl={8}>
              <Form.Item label='Body score' name='body_score'>
                <Select
                  placeholder="Please select Body score"
                  style={{
                    width: '100%',
                  }}
                  options={BODY_SCORE}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col xl={8}>
              <Form.Item label='Caregiver name' name='caregiver_name'>
                <TextArea disabled placeholder='Caregiver name' />
              </Form.Item>
            </Col>

            <Col xl={8}>
              <Form.Item label='Caregiver number' name='caregiver_number'>
                <TextArea disabled placeholder='Caregiver number' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col xl={8}>
              <Form.Item label='Problem' name='problem'>
                <Select
                  onChange={(e) => handleProblem(e)}
                  placeholder="Please select problem"
                  style={{
                    width: '100%',
                  }}
                  options={PROBLEM}
                />
              </Form.Item>
            </Col>

            {problemType ?
              <Col xl={8}>
                <Form.Item label='Problem type' name='problem_type'>
                  <Select
                    mode='multiple'
                    placeholder="Please select problem type"
                    style={{
                      width: '100%',
                    }}
                    options={computeProblemType('problem_type')}
                  />
                </Form.Item>
              </Col>
              : null}

            {problemType ?
              <Col xl={8}>
                <Form.Item label={problemType !== 'sick' ? 'Injury location' : 'Symptoms'}
                  name={problemType !== 'sick' ? 'injury_location' : 'symptoms'}>
                  <Select
                    mode='multiple'
                    placeholder="Please select symptoms"
                    style={{
                      width: '100%',
                    }}
                    options={computeProblemType('symptoms')}
                  />
                </Form.Item>
              </Col>
              : null}
          </Row>

          <Row gutter={[10, 10]}>
            <Col xl={8}>
              <Form.Item label='Other condition' name='alt_problem'>
                <Select
                  onChange={(e) => handleOtherCondition(e)}
                  placeholder="Please select other condition"
                  style={{
                    width: '100%',
                  }}
                  options={PROBLEM}
                />
              </Form.Item>
            </Col>

            {otherCondition ?
              <Col xl={8}>
                <Form.Item label='Problem type' name='alt_problem_type'>
                  <Select
                    mode='multiple'
                    placeholder="Please select problem type"
                    style={{
                      width: '100%',
                    }}
                    options={computeProblemType('problem_type')}
                  />
                </Form.Item>
              </Col>
              : null}

            {otherCondition ?
              <Col xl={8}>
                <Form.Item label={otherCondition !== 'sick' ? 'Injury location' : 'Symptoms'}
                  name={otherCondition !== 'sick' ? 'alt_injury_location' : 'alt_symptoms'}>
                  <Select
                    mode='multiple'
                    placeholder="Please select symptoms"
                    style={{
                      width: '100%',
                    }}
                    options={computeProblemType('symptoms')}
                  />
                </Form.Item>
              </Col>
              : null}
          </Row>


          <Row gutter={[10, 10]}>
            <Col xl={24}>
              <Form.Item label="Cause of problem" name="cause_of_problem">
                <TextArea placeholder='Cause of problem' />
              </Form.Item>
            </Col>


            <Col xl={24}>
              <Form.Item label="Rassi No." name="rassi_no">
                <Input placeholder='Rassi no' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        :
        <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
          <Loader />
        </div>
      }
    </Modal>

  );
};
export default TolfaAnimalStausModal;