import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  const { props } = router.query;
  const teste = props;

  return (
    <>
    {teste}
    </>
  )
}
