import { Button } from '@chakra-ui/button';
import { Skeleton } from '@chakra-ui/skeleton';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { isFuture, isPast } from 'date-fns';
import { RoundEndedBanner, RoundStartingSoon } from '~/components/common/donationCTA/DonationCTA';
import { useUserStore } from '~/store/userStore';

interface Props {
  roundId?: string;
  hackathonId?: string;
  projectJoinId?: string;
  hackathonJoinId?: string;
  startTime: Date;
  endTime: Date;
  loading: boolean;
  onDonateHandler: () => void;
  owner: string;
}

export const DonationStatus = (props: Props) => {
  const { user } = useUserStore();
  const { setVisible } = useWalletModal();
  if (props.roundId && props.projectJoinId) {
    // hackathon is starting soon
    if (isFuture(new Date(props.startTime))) {
      return <RoundStartingSoon startDate={props.startTime} isLoading={props.loading} />;
    }

    // hackathon is live
    if (isPast(new Date(props.startTime)) && isFuture(new Date(props.endTime))) {
      // when no user is connected
      if (!user) {
        return (
          <Skeleton
            opacity={props.loading ? '0.5' : 1}
            fadeDuration={2}
            isLoaded={!props.loading}
            w="full"
          >
            <Button onClick={() => setVisible(true)} variant="cubikFilled" size="md" w="full">
              Connect Wallet
            </Button>
          </Skeleton>
        );
      }

      return (
        <Skeleton
          opacity={props.loading ? '0.5' : 1}
          fadeDuration={2}
          isLoaded={!props.loading}
          w="full"
        >
          <Button onClick={props.onDonateHandler} variant="cubikFilled" size="md" w="full">
            Donate
          </Button>
        </Skeleton>
      );
    }

    // hackathon has ended
    if (isPast(new Date(props.endTime))) {
      return <RoundEndedBanner endDate={props.endTime} isLoading={props.loading} />;
    }
    return <></>;
  }

  if (props.hackathonId && props.hackathonJoinId) {
    // hackathon is starting soon
    if (isFuture(new Date(props.startTime))) {
      return (
        <RoundStartingSoon
          isHackathon={true}
          startDate={props.startTime}
          isLoading={props.loading}
        />
      );
    }

    // round is live
    if (isPast(new Date(props.startTime)) && isFuture(new Date(props.endTime))) {
      // when no user is connected
      if (!user) {
        return (
          <Skeleton
            opacity={props.loading ? '0.5' : 1}
            fadeDuration={2}
            isLoaded={!props.loading}
            w="full"
          >
            <Button onClick={() => setVisible(true)} variant="cubikFilled" size="md" w="full">
              Connect Wallet
            </Button>
          </Skeleton>
        );
      }

      if (user.mainWallet === props.owner) {
        return (
          <Skeleton
            opacity={props.loading ? '0.5' : 1}
            fadeDuration={2}
            isLoaded={!props.loading}
            w="full"
          >
            <Button disabled={true} isDisabled={true} variant="cubikFilled" size="md" w="full">
              Donate
            </Button>
          </Skeleton>
        );
      }

      return (
        <Skeleton
          opacity={props.loading ? '0.5' : 1}
          fadeDuration={2}
          isLoaded={!props.loading}
          w="full"
        >
          <Button onClick={props.onDonateHandler} variant="cubikFilled" size="md" w="full">
            Donate
          </Button>
        </Skeleton>
      );
    }

    // hackathon has ended
    if (isPast(new Date(props.endTime))) {
      return (
        <RoundEndedBanner isHackathon={true} endDate={props.endTime} isLoading={props.loading} />
      );
    }
    // default nothing
    return <></>;
  }

  return <></>;
};
