// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful. =)

import DefaultLayout from 'src/layouts/DefaultLayout'
import Wrapper from 'src/components/Wrapper'
import Illustration from 'src/components/Illustration'
import FatalErrorImage from 'src/lib/fatal-error.svg'

export default () => (
  <DefaultLayout>
    <Wrapper>
      <Illustration
        image={FatalErrorImage}
        message="The website has encountered an error. Please try again..."
      />
    </Wrapper>
  </DefaultLayout>
)
