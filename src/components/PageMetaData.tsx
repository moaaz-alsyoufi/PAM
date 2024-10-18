import { Helmet } from "react-helmet-async";

type PageMetaDataProps = {
  title: string;
};

const PageMetaData = ({ title }: PageMetaDataProps) => {
  return (
    <Helmet>
      <title> {title} | PAM</title>
    </Helmet>
  );
};

export default PageMetaData;
