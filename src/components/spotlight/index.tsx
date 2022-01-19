import Image from 'next/image'

const SpotlightProject = () => {
  return (
    <div className="container mx-auto mt-40">
      <div className="flex flex-col justify-center px-[52px] mx-auto max-w-7xl">
        <div>
          <p className="font-medium text-windowyellow">- Spotlight</p>
          <h2 className="text-5xl font-bold text-whitetext">Quanty</h2>
        </div>
        <div className="pl-20 pr-3 mt-32">
          <div className="flex flex-col items-start justify-center ">
            <span className="text-3xl font-bold text-whitetext">
              - Description
            </span>
            <p className="pl-4 text-xl text-graytext">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
              tortor sagittis eget ac pharetra leo. Facilisi id leo, tristique
              id. Et laoreet venenatis amet sapien eget. Vestibulum arcu ut
              dapibus sagittis.
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center justify-between w-full max-w-xs pl-4">
              <Image
                className="h-full rounded-lg w-9"
                src="https://via.placeholder.com/35x35"
                alt="test"
                height={35}
                width={35}
              />
              <Image
                className="w-1/6 h-8 rounded-lg"
                src="https://via.placeholder.com/31x31"
                alt="test"
                height={35}
                width={35}
              />
              <Image
                className="h-full rounded-lg w-9"
                src="https://via.placeholder.com/35x35"
                alt="test"
                height={35}
                width={35}
              />
              <Image
                className="h-full rounded-lg w-9"
                src="https://via.placeholder.com/35x35"
                alt="test"
                height={35}
                width={35}
              />
            </div>
            <div className="flex space-x-2.5 items-center justify-between w-16">
              <Image
                className="h-full rounded-lg w-7"
                src="https://via.placeholder.com/29.977581024169922x30.941177368164062"
                alt="test"
                height={35}
                width={35}
              />
              <Image
                className="w-1/3 rounded-lg h-3/4"
                src="https://via.placeholder.com/23.207069396972656x23.207067489624023"
                alt="test"
                height={35}
                width={35}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpotlightProject
