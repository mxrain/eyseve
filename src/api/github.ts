import axios from 'axios';

const GITHUB_TOKEN = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN';
const GITHUB_USERNAME = 'mxrain';
const GITHUB_REPO_NAME = '';

export const useGitHub = () => {
  const updateFile = async (type: string, id: number, object: any) => {
    try {
      const data = JSON.stringify(object);
      const response = await axios.put(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/contents/data/${type}.json`, {
        path: `data/${type}.json`,
        message: `修改 ${type} 数据 ${id}`,
        content: data,
        sha: '', // 如果需要，可获取当前文件 SHA
      }, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      // 成功更新文件
    } catch (error) {
      console.error('更新文件错误:', error);
      // 处理错误
    }
  };

  return {
    updateFile,
  };
};