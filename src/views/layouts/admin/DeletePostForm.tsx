import { Form, Input, Select } from 'antd';
import type { FormProps } from 'antd';
import { deletePost } from 'api/requests/requestPost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { StatusType } from 'types/apiStatusTypes';

const formCss = css`
  .ant-form-item {
    margin-bottom: 10px;
  }
`;

interface FormModalProps {
  form: any;
  previousData: any;
  onStatusChange: (status: StatusType) => void;
  close: () => void;
}

function DeleteForm(props: FormModalProps) {
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      props.form.resetFields();
      props.onStatusChange('success');
      props.close();
      queryClient.invalidateQueries({ queryKey: ['category', 0] });
    },
    onError: () => {
      props.onStatusChange('error');
    },
    onMutate: () => {
      props.onStatusChange('loading');
    },
  });

  const onFinish: FormProps['onFinish'] = () => {
    deletePostMutation.mutate(props.previousData.postId);
  };

  return (
    <Form
      css={formCss}
      form={props.form}
      colon={false}
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={props.previousData}
    >
      <Form.Item label="게시글 ID" name="postId">
        <Input disabled />
      </Form.Item>
      <Form.Item label="게시글 카테고리" name="categoryId">
        <Input disabled />
      </Form.Item>
      <Form.Item label="게시글 제목" name="postName">
        <Input disabled />
      </Form.Item>
      <Form.Item label="게시글 내용" name="postContentName">
        <Input disabled />
      </Form.Item>
      <Form.Item label="게시글 작성일" name="postDate">
        <Input disabled />
      </Form.Item>
      <Form.Item label="게시글 조회수" name="postView">
        <Input disabled />
      </Form.Item>
    </Form>
  );
}

export { DeleteForm };
