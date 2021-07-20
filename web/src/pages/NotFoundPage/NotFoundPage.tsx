import DefaultLayout from 'src/layouts/DefaultLayout'
import Wrapper from 'src/components/Wrapper'
import Illustration from 'src/components/Illustration'
import NotFoundImage from 'src/lib/not-found.svg'

export default () => (
  <DefaultLayout>
    <Wrapper>
      <Illustration
        image={NotFoundImage}
        message="This page cannot be found..."
      />
    </Wrapper>
  </DefaultLayout>
)
