import { useEffect } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { useTaskModal, useTasksQueryKey } from './util'
import { useDeleteTask, useEditTask } from 'utils/task'
import { UserSelect } from 'components/user-select'
import { TaskTypeSelect } from 'components/task-type-select'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export const TaskModal = () => {
  const [form] = Form.useForm()
  const { editingTaskId, editingTask, close } = useTaskModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey())

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    close()
  }

  const startDelete = () => {
    close()
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗',
      onOk() {
        return deleteTask({ id: Number(editingTaskId) })
      },
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  return (
    <Modal
      forceRender
      okText="确认"
      getContainer={false}
      cancelText="取消"
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item label="任务名" name="name" rules={[{ required: true, message: '请输入任务名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName="经办人"></UserSelect>
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button size="small" onClick={startDelete} style={{ fontSize: '14px' }}>
          删除
        </Button>
      </div>
    </Modal>
  )
}
