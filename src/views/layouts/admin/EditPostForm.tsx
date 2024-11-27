import { Form, Input, Select, Skeleton } from 'antd';
import type { FormProps } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { PutPost } from 'api/models/request';
import { putPost } from 'api/requests/requestPost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { StatusType } from 'types/apiStatusTypes';

const formCss = css`
  .ant-form-item {
    margin-bottom: 10px;
  }
`;

type FieldType = PutPost;

const CATEGORY_OPTIONS = [
  { value: 1, label: '족저근막염' },
  { value: 2, label: '발부종' },
  { value: 3, label: '당뇨병성 발' },
  { value: 4, label: '발 뒤꿈치 통증' },
  { value: 5, label: '무좀(발냄새)' },
  { value: 6, label: '발목 염좌' },
  { value: 7, label: '생활 습관' },
  { value: 8, label: '건강 정보' },
  { value: 9, label: '제품 추천' },
];
interface FormModalProps {
  form: any;
  previousData: any;
  onStatusChange: (status: StatusType) => void;
  close: () => void;
}

function EditForm(props: FormModalProps) {
  const queryClient = useQueryClient();

  const editPostMutation = useMutation({
    mutationFn: (data: PutPost) => putPost(props.previousData.postId, data),
    onSuccess: () => {
      props.form.resetFields();
      props.onStatusChange('success');
      props.close();
      // 게시글 조회로 수정
      queryClient.invalidateQueries({ queryKey: ['category', 0] });
    },
    onError: () => {
      props.onStatusChange('error');
    },
    onMutate: () => {
      props.onStatusChange('loading');
    },
  });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    editPostMutation.mutate(values);
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
    >
      <Form.Item label="게시글 ID" name="postId" initialValue={props.previousData.postId}>
        <Input disabled />
      </Form.Item>
      <Form.Item<FieldType>
        label="카테고리"
        name="categoryId"
        initialValue={props.previousData.categoryId}
        rules={[{ required: true, message: '카테고리를 선택해주세요.' }]}
      >
        <Select placeholder="카테고리를 선택해주세요" options={CATEGORY_OPTIONS} />
      </Form.Item>
      <Form.Item<FieldType>
        label="게시글 제목"
        name="postName"
        initialValue={props.previousData.postName}
        rules={[{ required: true, message: '게시글 제목을 입력해주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="게시글 내용"
        name="postContentName"
        initialValue={props.previousData.postContentName}
        rules={[{ required: true, message: '게시글 내용을 입력해주세요.' }]}
      >
        <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="게시글 작성일"
        name="postDate"
        initialValue={props.previousData.postDate}
        rules={[{ required: true, message: '게시글 작성일을 입력해주세요.' }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<FieldType>
        label="게시글 조회수"
        name="postView"
        initialValue={props.previousData.postView}
      >
        <Input disabled />
      </Form.Item>
    </Form>
  );
}

export { EditForm };
